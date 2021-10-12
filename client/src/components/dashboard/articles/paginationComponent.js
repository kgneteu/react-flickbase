import React from 'react';
import Moment from 'react-moment';
import {Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {Loader} from "../../../utils/loader";
import Pagination from '@material-ui/lab/Pagination';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';

const PaginationComponent = ({arts, next, handleStatusChange, handleShow, editArticle}) => {
    const handleChange = (event, value) => {
        next(value)
    }

    return (
        <>
            {arts && arts.docs ?
                <>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Created</TableCell>
                                <TableCell>Tittle</TableCell>
                                <TableCell>Score</TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arts.docs.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell><Moment to={item.date}></Moment></TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.score}</TableCell>
                                    <TableCell>
                                        <ButtonGroup color={'primary'} >
                                            <Button
                                                onClick={()=>editArticle(item._id)}
                                                startIcon={<EditIcon/>}>Edit</Button>
                                            <Button
                                                onClick={()=>handleShow(item._id)}
                                                startIcon={<DeleteIcon/>}>Delete</Button>
                                            <Button
                                                onClick={()=>handleStatusChange(item.status, item._id)}
                                                startIcon={<AssistantPhotoIcon/>}>{item.status}</Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Pagination count={arts.pages}
                                color="primary"
                                page={arts.page}
                                onChange={handleChange}
                    >
                    </Pagination>
                </>
                :
                <Loader/>
            }
        </>
    )
}

export default PaginationComponent;
