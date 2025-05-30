import Form from '../models/formModel.js';
import FormResponse from '../models/responseModel.js';
import  User from '../models/userModel.js';
import { sendEmail } from '../utils/mailService.js';
import mongoose from 'mongoose';


// Create a new form and return render URL
export const createForm = async (req, res) => {
  const { title, description, fields, settings } = req.body;
const userId = req.user.id; 
  try {
    const newForm = new Form({ title, description, fields, settings ,  userId});
    await newForm.save();

    await User.findByIdAndUpdate(userId, {
      $push: { forms: newForm._id }
    });
    // Generate render URL
    const renderUrl = `${req.protocol}://${req.get('host')}/api/forms/${newForm.formId}/render`;
    console.log(`🆕 Render Form UI URL: ${renderUrl}`);

    res.status(201).json({
      message: "Form created successfully",
      form: newForm,
      renderUrl
    });
  } catch (err) {
    console.error("❌ Error creating form:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all forms
export const getAllForms = async (req, res) => { 
  try {
    const forms = await Form.find({ userId: req.user.id });
    res.status(200).json(forms);
  } catch (err) {
    console.error("❌ Error fetching forms:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single form by formId
export const getFormById = async (req, res) => {
  try {
    const form = await Form.findOne({ formId: req.params.id });

    if (!form) return res.status(404).json({ error: "Form not found" });

    // Check if the form belongs to the logged-in user
    if (form.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    res.status(200).json(form);
  } catch (err) {
    console.error("❌ Error fetching form:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update form
export const updateForm = async (req, res) => {
  try {
    const form = await Form.findOne({ formId: req.params.id });

    if (!form) return res.status(404).json({ error: "Form not found" });

    if (form.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    Object.assign(form, req.body);
    await form.save();

    res.status(200).json({
      message: "Form updated successfully",
      form
    });
  } catch (err) {
    console.error("❌ Error updating form:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete form
export const deleteForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);


    if (!form) return res.status(404).json({ error: "Form not found" });

    if (form.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    await form.deleteOne();

    // Remove reference from User
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { forms: form._id }
    });

    res.status(200).json({ message: "Form deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting form:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Render Form UI by formId
export const renderFormUI = async (req, res) => {
  try {
    const form = await Form.findOne({ formId: req.params.id });
    if (!form) return res.status(404).send('Form not found');

    let fieldsHtml = '';
    form.fields.forEach(field => {
      fieldsHtml += `
        <div class="field padding-bottom--24">
          <label for="${field.name}">${field.label}</label>
          <input 
            type="${field.type}" 
            name="${field.name}" 
            ${field.required ? 'required' : ''}
          />
        </div>
      `;
    });

    const html = `
      <html>
      <head>
        <meta charset="utf-8">
        <title>${form.title}</title>
        <style>
          ${/* Paste your full CSS here */''}

          * {
  padding: 0;
  margin: 0;
  color: #1a1f36;
  box-sizing: border-box;
  word-wrap: break-word;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif;
}
body {
    min-height: 100%;
    background-color: #ffffff;
}
h1 {
    letter-spacing: -1px;
}
a {
  color: #5469d4;
  text-decoration: unset;
}
.login-root {
    background: #fff;
    display: flex;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
}
.loginbackground {
    min-height: 692px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 0;
    overflow: hidden;
}
.flex-flex {
    display: flex;
}
.align-center {
  align-items: center; 
}
.center-center {
  align-items: center;
  justify-content: center;
}
.box-root {
    box-sizing: border-box;
}
.flex-direction--column {
    -ms-flex-direction: column;
    flex-direction: column;
}
.loginbackground-gridContainer {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: [start] 1fr [left-gutter] (86.6px)[16] [left-gutter] 1fr [end];
    grid-template-columns: [start] 1fr [left-gutter] repeat(16,86.6px) [left-gutter] 1fr [end];
    -ms-grid-rows: [top] 1fr [top-gutter] (64px)[8] [bottom-gutter] 1fr [bottom];
    grid-template-rows: [top] 1fr [top-gutter] repeat(8,64px) [bottom-gutter] 1fr [bottom];
    justify-content: center;
    margin: 0 -2%;
    transform: rotate(-12deg) skew(-12deg);
}
.box-divider--light-all-2 {
    box-shadow: inset 0 0 0 2px #e3e8ee;
}
.box-background--blue {
    background-color: #5469d4;
}
.box-background--white {
  background-color: #ffffff; 
}
.box-background--blue800 {
    background-color: #212d63;
}
.box-background--gray100 {
    background-color: #e3e8ee;
}
.box-background--cyan200 {
    background-color: #7fd3ed;
}
.padding-top--64 {
  padding-top: 64px;
}
.padding-top--24 {
  padding-top: 24px;
}
.padding-top--48 {
  padding-top: 48px;
}
.padding-bottom--24 {
  padding-bottom: 24px;
}
.padding-horizontal--48 {
  padding: 48px;
}
.padding-bottom--15 {
  padding-bottom: 15px;
}


.flex-justifyContent--center {
  -ms-flex-pack: center;
  justify-content: center;
}

.formbg {
    margin: 0px auto;
    width: 100%;
    max-width: 448px;
    background: white;
    border-radius: 4px;
    box-shadow: rgba(60, 66, 87, 0.12) 0px 7px 14px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px 0px;
}
span {
    display: block;
    font-size: 20px;
    line-height: 28px;
    color: #1a1f36;
}
label {
    margin-bottom: 10px;
}
.reset-pass a,label {
    font-size: 14px;
    font-weight: 600;
    display: block;
}
.reset-pass > a {
    text-align: right;
    margin-bottom: 10px;
}
.grid--50-50 {
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
}

.field input {
    font-size: 16px;
    line-height: 28px;
    padding: 8px 16px;
    width: 100%;
    min-height: 44px;
    border: unset;
    border-radius: 4px;
    outline-color: rgb(84 105 212 / 0.5);
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(60, 66, 87, 0.16) 0px 0px 0px 1px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px;
}

input[type="submit"] {
    background-color: rgb(84, 105, 212);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, 
                rgb(84, 105, 212) 0px 0px 0px 1px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(0, 0, 0, 0) 0px 0px 0px 0px, 
                rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
}
.field-checkbox input {
    width: 20px;
    height: 15px;
    margin-right: 5px; 
    box-shadow: unset;
    min-height: unset;
}
.field-checkbox label {
    display: flex;
    align-items: center;
    margin: 0;
}
a.ssolink {
    display: block;
    text-align: center;
    font-weight: 600;
}
.footer-link span {
    font-size: 14px;
    text-align: center;
}
.listing a {
    color: #697386;
    font-weight: 600;
    margin: 0 10px;
}

.animationRightLeft {
  animation: animationRightLeft 2s ease-in-out infinite;
}
.animationLeftRight {
  animation: animationLeftRight 2s ease-in-out infinite;
}
.tans3s {
  animation: animationLeftRight 3s ease-in-out infinite;
}
.tans4s {
  animation: animationLeftRight 4s ease-in-out infinite;
}

@keyframes animationLeftRight {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(1000px);
  }
  100% {
    transform: translateX(0px);
  }
} 

@keyframes animationRightLeft {
  0% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(-1000px);
  }
  100% {
    transform: translateX(0px);
  }
} 
          /* For simplicity in this snippet, you should paste your complete CSS */
        </style>
      </head>
      <body>
        <div class="login-root">
          <div class="box-root flex-flex flex-direction--column" style="min-height: 100vh;flex-grow: 1;">
            <div class="loginbackground box-background--white padding-top--64">
              <div class="loginbackground-gridContainer">
                <div class="box-root box-divider--light-all-2 animationLeftRight tans3s" style="flex-grow: 1;"></div>

<div class="box-root box-background--blue animationLeftRight" style="flex-grow: 1;"></div>

<div class="box-root box-background--gray100 animationLeftRight tans3s" style="flex-grow: 1;"></div>

<div class="box-root box-background--cyan200 animationRightLeft tans4s" style="flex-grow: 1;"></div>

<div class="box-root box-background--blue animationRightLeft" style="flex-grow: 1;"></div>

<div class="box-root box-background--gray100 animationRightLeft tans4s" style="flex-grow: 1;"></div>

<div class="box-root box-divider--light-all-2 animationRightLeft tans3s" style="flex-grow: 1;"></div>

              </div>
            </div>
            <div class="box-root padding-top--24 flex-flex flex-direction--column" style="flex-grow: 1; z-index: 9;">
              <div class="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                <h1>${form.title}</h1>
              </div>
              <div class="formbg-outer">
                <div class="formbg">
                  <div class="formbg-inner padding-horizontal--48">
                    <span class="padding-bottom--15">Fill out the form below</span>
                    <form method="POST" action="/api/forms/${form.formId}/submit">
                      ${fieldsHtml}
                      <div class="field padding-bottom--24">
                        <input type="submit" value="Submit">
                      </div>
                    </form>
                  </div>
                </div>
                <div class="footer-link padding-top--24">
                  <div class="listing padding-top--24 padding-bottom--24 flex-flex center-center">
                    <span><a href="#">© Stackfindover</a></span>
                    <span><a href="#">Contact</a></span>
                    <span><a href="#">Privacy & terms</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Submit form response

export const submitFormResponse = async (req, res) => {
  try {
    // 1. Find form by formId
    const form = await Form.findOne({ formId: req.params.id });
    if (!form) return res.status(404).send('Form not found');

    // 2. Collect submitted responses
    const response = {};
    form.fields.forEach(field => {
      response[field.name] = req.body[field.name] || null;
    });

    // // 3. Send email notification if enabled
    // if (form.settings?.notificationEmail) {
    //   await sendEmail({
    //     to: form.settings.notificationEmail,
    //     subject: `📩 New Submission for "${form.title}"`,
    //     text: `New form submission:\n${JSON.stringify(response, null, 2)}`,
    //     html: `
    //       <h2>New Form Submission: ${form.title}</h2>
    //       <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
    //         ${Object.entries(response).map(([key, value]) => `
    //           <tr>
    //             <td><strong>${key}</strong></td>
    //             <td>${value ?? 'N/A'}</td>
    //           </tr>
    //         `).join('')}
    //       </table>
    //     `,
    //   });
    // }

    // 4. Save response to DB with reference to user (form owner)
    await FormResponse.create({
      formId: form._id,
      userId: form.userId, // ✅ Add this line (assuming `user` field exists in Form model)
      response,
      submittedAt: new Date(),
    });

    // 5. Redirect if redirect URL is set
    if (form.settings?.redirectUrl) {
      return res.redirect(form.settings.redirectUrl);
    }

    // 6. Return success HTML
    res.send(`
      <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <div style="background: #d4edda; color: #155724; padding: 15px; border-radius: 5px;">
            ✅ Thank you! Your response has been submitted successfully.
          </div>
          <br />
          <a href="/" style="text-decoration: none; color: #007bff;">⬅️ Back to Home</a>
        </body>
      </html>
    `);
  } catch (err) {
    console.error("❌ Error submitting form response:", err);
    res.status(500).send('Server error');
  }
};




export const getFormResponses = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const responses = await FormResponse.find({ userId: userObjectId })
      .populate("formId", "title _id") // only populate required fields
      .sort({ submittedAt: -1 });

    const formatted = responses.map((resp) => ({
      formTitle: resp.formId?.title || "Untitled Form",
      formId: resp.formId?._id,
      response: resp.response,
      responseTime: resp.responseTime || null,
      submittedAt: resp.submittedAt,
    }));

    res.status(200).json({ responses: formatted });
  } catch (err) {
    console.error("❌ Error fetching user responses:", err);
    res.status(500).json({ error: "Server error" });
  }
};