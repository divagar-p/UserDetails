import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";

// Define the types for the form inputs
interface FormInputs {
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}

const EditForm = (props: { editUser: any; onClose: any; }) => {
    const { editUser, onClose } = props;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormInputs>();

    // Populate the form with initial values when `editUser` changes
    useEffect(() => {
        if (editUser?.editUser) {
            const data = editUser?.editUser
            setValue("first_name", data.first_name || "");
            setValue("last_name", data.last_name || "");
            setValue("email", data.email || "");
            setValue("avatar", data.avatar || "");
        }
    }, [editUser, setValue]);

    // Define the submit handler
    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        onClose(false); // Close modal on submit
    };

    const handleClose = () => onClose(false);

    return (
        <div>
            {/* Modal */}
            <Dialog open={editUser?.open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <form
                        id="EditForm"
                        onSubmit={handleSubmit(onSubmit)}
                        style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: '5px' }}
                    >
                        {/* First Name */}
                        <TextField
                            size="small"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            error={!!errors.first_name}
                            helperText={errors.first_name?.message}
                            {...register("first_name", { required: "First Name is required" })}
                        />

                        {/* Last Name */}
                        <TextField
                            size="small"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            error={!!errors.last_name}
                            helperText={errors.last_name?.message}
                            {...register("last_name", { required: "Last Name is required" })}
                        />

                        {/* Email */}
                        <TextField
                            size="small"
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
                            size="small"
                            label="Profile Image Link"
                            variant="outlined"
                            type="url"
                            fullWidth
                            error={!!errors.avatar}
                            helperText={errors.avatar?.message}
                            {...register("avatar", { required: "Profile Image Link is required" })}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button type="submit" form="EditForm" color="primary" variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditForm;
