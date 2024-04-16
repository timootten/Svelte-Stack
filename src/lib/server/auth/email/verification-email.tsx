import { Head, Html, Preview } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

/*

  import { render } from '@react-email/render';
  import nodemailer from "nodemailer";

  const transporter = nodemailer.createTransport({
    url: "smtps://Admin%40ShadeHost.eu:Timo0580%21@mail.ShadeHost.eu"
  });

  transporter.sendMail({
    from: "NoReply@ShadeHost.eu",
    to: "timootten@icloud.com",
    subject: "Verify your email",
    html: render(VerificationEmail())
  });
*/

export default function VerificationEmail({ link, username }: { link: string; username: string }) {
	return (
		<Html>
			<Head />
			<Preview>Verification E-Mail</Preview>
			<Tailwind>
				<body>
					<div className="prose prose-sm mx-auto p-4">
						<div className="text-center">
							<p className="pb-10 text-2xl font-bold text-black">Svelte-Stack</p>
							<img
								alt="Logo"
								className="mx-auto"
								height="120"
								src="https://dev.shadehost.eu/favicon.png"
								style={{
									aspectRatio: '120/120',
									objectFit: 'cover'
								}}
								width="120"
							/>
							<h1 className="text-2xl font-bold">Verify your email</h1>
							<p className="text-gray-400">Hello {username},</p>
							<p className="text-gray-400">you're almost there. Your email needs to be verified.</p>
						</div>
						<div className="mx-auto mt-16 block text-center">
							<a href={link}>
								<p
									className=" py-auto inline-flex h-12 flex-row items-center justify-center whitespace-nowrap rounded-md bg-black px-8 font-medium text-white ring-offset-background transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
									style={{ lineHeight: '3rem !important', fontSize: '1rem' }}
								>
									Verify Email
								</p>
							</a>
						</div>
						<footer className="mt-16 text-center text-gray-400">
							© 2024 Your Company Name.
							<br />
							<a className="px-2 underline" href="#">
								Imprint
							</a>
							|
							<a className="px-2 underline" href="#">
								Terms
							</a>
						</footer>
					</div>
				</body>
			</Tailwind>
		</Html>
	);
}