import AdminLayout from "../../../hoc/adminLayout";
import {Button, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getCategories} from "../../../store/actions/categories_actions";
import {Loader} from "../../../utils/loader";
import AddCategoryDialog from "./addCategoryDialog";
import Moment from "react-moment";



const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories)
    const [loading, setLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(()=>{

        setLoading(false)
    },[categories])

    if (loading) return (
        <AdminLayout section="Categories">
            <Loader/>
        </AdminLayout>
    )
    return (
        <AdminLayout section="Categories">
            <Button variant="outlined"
                    color={'secondary'}
                    onClick={()=>setShowDialog(true)}
                    >
                Add category
            </Button>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell>Created</TableCell>
                        <TableCell>Tittle</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(categories) && categories.map(category => (
                        <TableRow key={category._id}>
                            <TableCell><Moment to={category.date}/></TableCell>
                            <TableCell>{category.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <AddCategoryDialog open={showDialog} setVisible={(value)=>setShowDialog(value)}/>
        </AdminLayout>
    );
};

export default Categories;
