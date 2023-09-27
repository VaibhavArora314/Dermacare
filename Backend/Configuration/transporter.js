import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.OFFICIAL_MAIL}`, // Your email address
      pass: `${process.env.OFFICIAL_MAIL_PASS_KEY}`, // Your email password or app-specific password
    },
  });
  export default transporter;
  