import { Avatar, Box, Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const UserTable = (props: { page: any; users: any; totalPage: any; handleEdit: (val: any) => void, handleDelete: (val: any) => void, onPagination: (val: any) => void }) => {
    const { page, users, totalPage, handleEdit, handleDelete, onPagination } = props;
    return (
        <>
            {/* User Table */}
            <TableContainer
                sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> </TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user: any) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Avatar src={user.avatar} alt={user.first_name} />
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        sx={{ mr: 1 }}
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                <Pagination
                    count={totalPage}
                    page={page}
                    onChange={(e, value) => onPagination(value)}
                    color="primary"
                />
            </Box>
        </>
    )
}
export default UserTable;