import { AuthContext, betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../db/db";
import config from "../config";
import { admin } from "better-auth/plugins"

export const auth = betterAuth({
    onAPIError: {
        throw: true,
		onError: (error, ctx:AuthContext) => {
			// Custom error handling
            
			console.error("Auth error:", error);
		},
		errorURL: `${config.BACKEND_URL}/api/auth/error`,
        
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql", 
    }),
    emailAndPassword: {  
        enabled: true
    },
    socialProviders : {
        google: {
            clientId: config.GOOGLE_ID || "",
            clientSecret: config.GOOGLE_SECRET || "",
            redirectURI:`${config.BACKEND_URL}${config.GOOGLE_CALLBACK_URL}`,
            
        },
        // facebook: {
        //     clientId: config.FACEBOOK_ID || "",
        //     clientSecret: config.FACEBOOK_SECRET || "",
        // },
        
    },
    plugins:[
     admin({
        adminRoles: ["admin","superadmin"],
        adminUserIds:[],
        defaultRole:"user",
        defaultBanReason:"No reason",
        impersonationSessionDuration: 60 * 60 * 24,
      
     })   
]
   
});