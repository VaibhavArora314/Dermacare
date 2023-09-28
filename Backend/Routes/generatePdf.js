import PDFDocument from "pdfkit"; // Import PDFKit
import path from "path"; // Import the 'path' module
import { fileURLToPath } from "url";
import fs from "fs";
import { User } from "../DB/userSchema.js";
import { downloadImage } from "./image_extraction.js";
import { calculateAge } from "../Utility/calculateAge.js";
import transporter from "../Configuration/transporter.js";

async function generatePdf(req, res) {
  try {
    const userId = req.userId;
    const index = req.query.index; // Get the disease name from the query parameter
    const needEmail = req.query.needEmail;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!user.username) {
      return res
        .status(400)
        .json({ error: "Username not found in user profile." });
    }

    const diseaseName = user.uploadedImages[index].diseaseName;
    const imageUrl = user.uploadedImages[index].imageUrl;
    const diseaseInfoResponse = user.uploadedImages[index].diseaseInfoPrompt;
    const medicinesResponse = user.uploadedImages[index].medicinesPrompt;
    // console.log(diseaseInfoResponse);
    // console.log(medicinesResponse);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Ensure that both responses are valid
    if (!diseaseInfoResponse || !medicinesResponse) {
      return res.status(500).json({ error: "Invalid diagnosis response." });
    }

    // Create a new PDF document
    const doc = new PDFDocument();

    // Get the directory path of the current module
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    // Modify the path to the logo image (replace 'logo.png' with your logo file name)
    const logoPath = path.join(__dirname, "logo.png"); // Replace 'logo.png' with the actual filename

    let validFile = false,
      downloadedImagePath;
    if (imageUrl) {
      try {
        const downloadImageName = await downloadImage(imageUrl);
        downloadedImagePath = path.join(__dirname, downloadImageName);

        fs.accessSync(downloadedImagePath, fs.constants.F_OK);
        validFile = true;
        console.log("Valid Path!");
      } catch (error) {
        console.log(error);
      }
    }

    // PDF Generation
    // Pipe the PDF document to the response

    // Add a professional title with logo and bold heading
    const logoWidth = 200; // Adjust the logo width as needed
    const pageWidth = doc.page.width;
    const xPosition = (pageWidth - logoWidth) / 2;

    doc.image(logoPath, xPosition, 20, { width: logoWidth }); // Place the logo at the top-center

    // User Information Section
    doc
      .fontSize(16)
      .fillColor("#333333")
      .text("User Information", { underline: true });
    doc.fontSize(12).fillColor("#333333").text(`Name: ${user.username}`);
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text(`Age: ${calculateAge(user.dob)}`);
    doc.fontSize(12).fillColor("#333333").text(`Gender: ${user.gender}`);
    doc.fontSize(12).fillColor("#333333").text(`Email: ${user.email}`);

    const imageWidth = 200; // Set the image width
    const xImagePosition = (pageWidth - imageWidth) / 2; // Center-align the image

    if (validFile) {
      doc.moveDown(1); // Add some space before the image

      // Display the locally saved image in the PDF
      doc.image(downloadedImagePath, xImagePosition, doc.y, {
        width: imageWidth,
      });

      doc.moveDown(1);
      console.log("File attached");
    }

    doc
      .fontSize(16)
      .fillColor("#333333")
      .text(`Diagnosis - ${diseaseName} Information`, { underline: true });
    // Add the detailed information about the disease from the API response
    doc.fontSize(12).fillColor("#333333").text(diseaseInfoResponse);

    // Medicines Suggestion Section
    doc.moveDown(0.5); // Add some space between sections
    doc
      .fontSize(16)
      .fillColor("#333333")
      .text("Medicines Suggestion", { underline: true });
    // Split the medicines response into lines and use them as medicine suggestions
    const medicines = medicinesResponse.split("\n").slice(0, 5);
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text("Here are 5 medicines that can help with this condition:");
    medicines.forEach((medicine, index) => {
      doc.fontSize(12).fillColor("#333333").text(`${medicine}`);
    });

    // Recommendations Section
    doc.moveDown(0.5); // Add some space between sections
    doc
      .fontSize(16)
      .fillColor("#333333")
      .text("Recommendations", { underline: true });
    // Add personalized recommendations or advice for the user here
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text("Based on your diagnosis, we recommend the following:");
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text("- Maintain a healthy skincare routine.");
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text("- Use sunscreen to protect your skin from UV rays.");
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text("- Consult a dermatologist for further evaluation.");

    // Additional Information Section
    doc.moveDown(0.5); // Add some space between sections
    doc
      .fontSize(16)
      .fillColor("#333333")
      .text("Additional Information", { underline: true });
    // Add any additional information or resources related to the disease here
    doc
      .fontSize(12)
      .fillColor("#333333")
      .text(
        "For more information and resources on this condition, you can visit our website or consult with our dermatologists."
      );

      // Note Section
doc.moveDown(0.5); // Add some space before the note
doc
  .fontSize(16)
  .fillColor("#333333")
  .text("Note", { underline: true });

// Add the provided disclaimer with red font color
doc
  .fontSize(12)
  .fillColor("red") // Set the font color to red
  .text(
    "The results are generated using advanced AI technology, which provides valuable insights. However, it is crucial to prioritize your health and well-being. We strongly recommend consulting a qualified medical professional before making any decisions or taking any additional steps based on these results."
  );

    // Copyright Section
    doc.moveDown(0.5); // Add some space before the copyright notice
    doc
      .fontSize(8)
      .fillColor("#333333")
      .text("© 2023 DermaCare. All rights reserved.", { align: "center" });

    // doc.end();

    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader(
    //   "Content-Disposition",
    //   `attachment; filename=user_diagnosis_${diseaseName}.pdf`
    // );
    // // res.pipe(doc);
    // doc.pipe(res);

    // Generate a PDF file and get its buffer
    const pdfBuffer = await new Promise((resolve, reject) => {
      const buffers = [];
      doc.on("data", (buffer) => buffers.push(buffer));
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.end();
    });

    // Send the PDF as an email attachment to the user's Gmail address
    if (needEmail) {
      const mailOptions = {
        from: `${process.env.OFFICIAL_MAIL}`, // Sender email address
        to: user.email, // User's email address
        subject: `Your Dermacare Diagnosis Report for ${diseaseName}`,
        text: `Dear ${user.username},\n\nPlease find attached your Dermacare diagnosis report for ${diseaseName}. This report contains detailed information about the condition, a list of recommended medicines, and personalized skincare advice.\n\nBest regards,\nThe Dermacare Team`,
        attachments: [
          {
            filename: `user_diagnosis_${diseaseName}.pdf`,
            content: pdfBuffer,
          },
        ],
      };

      // Send the email with the PDF attachment
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Email sending error." });
        } else {
          console.log("Email sent: " + info.response);
          return res.status(200).json({
            message: "PDF generated and sent successfully.",
            // pdf: pdfBuffer.toString("base64"),
            // diseaseName,
            // imageUrl,
            // diseaseInfoResponse,
            // medicinesResponse,
          });
        }
      });
    } else {
      return res.status(200).json({
        message: "PDF generated and sent successfully.",
        pdf: pdfBuffer.toString("base64"),
        diseaseName,
        imageUrl,
        diseaseInfoResponse,
        medicinesResponse,
      });
    }
  } catch (error) {
    console.error("Error generating PDF and sending email:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export { generatePdf };
