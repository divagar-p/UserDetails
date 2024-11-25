import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

// Define the types for the form inputs
interface FormInputs {
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
}

const AddEditForm: React.FC = () => {
    const [open, setOpen] = useState(false); // Modal state
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();

    // Define the submit handler
    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        console.log("Submitted Data:", data);
        setOpen(false); // Close modal on submit
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {/* Button to open the modal */}
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Create User
            </Button>

            {/* Modal */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <form
                        id="addEditForm"
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                    >
                        {/* First Name */}
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            {...register("firstName", { required: "First Name is required" })}
                        />

                        {/* Last Name */}
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            {...register("lastName", { required: "Last Name is required" })}
                        />

                        {/* Email */}
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />

                        {/* Profile Image Link */}
                        <TextField
                            label="Profile Image Link"
                            variant="outlined"
                            type="url"
                            fullWidth
                            error={!!errors.profileImage}
                            helperText={errors.profileImage?.message}
                            {...register("profileImage", { required: "Profile Image Link is required" })}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" form="addEditForm" color="primary" variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddEditForm;
