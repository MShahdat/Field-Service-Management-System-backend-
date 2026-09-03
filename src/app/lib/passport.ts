import passport from "passport";
import {
	Strategy as GoogleStrategy,
	Profile,
	VerifyCallback,
} from "passport-google-oauth20";
import config from "../config/env";
import { prisma } from "./prisma";
import { AuthProvider, UserRole } from "../../../generated/prisma/enums";
import { Strategy as FacebookStrategy } from "passport-facebook";

//& GOOGLE STRATEGY CONFIGURATION
passport.use(
	new GoogleStrategy(
		{
			clientID: config.google_client_id!,
			clientSecret: config.google_client_secret!,
			callbackURL: config.google_callback_uri!,
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: Profile,
			done: VerifyCallback,
		) => {
			try {
				const email = profile.emails?.[0].value;

				if (!email) {
					return done(null, false, {
						message: "email not found from google.",
					});
				}

				let user = await prisma.user.findUnique({
					where: { email },
				});

				if (user) {
					if (user.status === "DELETED") {
						return done(null, false, {
							message: "user deleted",
						});
					}
					if (user.status === "BLOCKED") {
						return done(null, false, {
							message: "user temporary blocked. please contact administration",
						});
					}

					user = await prisma.user.update({
						where: { email },
						data: {
							googleId: profile.id,
							emailVerified: true,
						},
					});
				} else if (!user) {
					user = await prisma.user.create({
						data: {
							name: profile.displayName,
							email,
							emailVerified: true,
							authProvider: "GOOGLE",
							googleId: profile.id,
							role: UserRole.CUSTOMER,
							customer: {
								create: {},
							},
						},
					});
				}
				return done(null, user);
			} catch (error) {
				return done(error);
			}
		},
	),
);

// //& FACEBOOK STRATEGY CONFIGURATION
passport.use(
	new FacebookStrategy(
		{
			clientID: config.facebook_app_key,
			clientSecret: config.facebook_app_secret,
			callbackURL: config.facebook_callback_url,
			profileFields: ["id", "displayName", "emails"],
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: any,
			done: VerifyCallback,
		) => {
			try {
				console.log("facebook profile", profile);
				const email = profile.emails?.[0]?.value;
				console.log("facebook email", email);

				if (!email) {
					return done(null, false, {
						message:
							"Facebook did not provide an email address. Please allow email permission and try again.",
					});
				}

				let user = await prisma.user.findUnique({
					where: { email },
				});

				if (user) {
					if (user.status === "DELETED") {
						return done(null, false, {
							message: "user deleted",
						});
					}
					if (user.status === "BLOCKED") {
						return done(null, false, {
							message: "user temporary blocked. please contact administration",
						});
					}

					user = await prisma.user.update({
						where: { email },
						data: {
							facebookId: profile.id,
							emailVerified: true,
						},
					});
				} else if (!user) {
					user = await prisma.user.create({
						data: {
							name: profile.displayName,
							email,
							emailVerified: true,
							authProvider: AuthProvider.FACEBOOK,
							facebookId: profile.id,
							role: UserRole.CUSTOMER,
							customer: {
								create: {},
							},
						},
					});
				}
				return done(null, user);
			} catch (error) {
				return done(error, false);
			}
		},
	),
);
