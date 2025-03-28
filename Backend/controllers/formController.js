import Form from '../models/formModel.js';

// Create a new form
export const createForm = async (req, res) => {
  const { title, description, fields, settings } = req.body;

  try {
    const newForm = new Form({
      title,
      description,
      fields,
      settings
    });

    await newForm.save();
    res.status(201).json({ message: "Form created successfully", form: newForm });
  } catch (err) {
    console.error("Error creating form:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all forms
export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (err) {
    console.error("Error fetching forms:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a specific form by ID
export const getFormById = async (req, res) => {
  const { id } = req.params;

  try {
    const form = await Form.findById(id);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.status(200).json(form);
  } catch (err) {
    console.error("Error fetching form:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a form by ID
export const updateForm = async (req, res) => {
  const { id } = req.params;
  const { title, description, fields, settings } = req.body;

  try {
    const updatedForm = await Form.findByIdAndUpdate(id, {
      title,
      description,
      fields,
      settings
    }, { new: true });

    if (!updatedForm) {
      return res.status(404).json({ error: "Form not found" });
    }

    res.status(200).json({ message: "Form updated successfully", form: updatedForm });
  } catch (err) {
    console.error("Error updating form:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a form by ID
export const deleteForm = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedForm = await Form.findByIdAndDelete(id);
    if (!deletedForm) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (err) {
    console.error("Error deleting form:", err);
    res.status(500).json({ error: "Server error" });
  }
};
