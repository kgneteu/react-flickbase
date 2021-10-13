    import React,{ useState} from 'react'
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {InputLabel, Paper} from "@material-ui/core";


const WYSIWYG = (props) => {
    const [editorData, setEditorData] = useState({
        editorState: EditorState.createEmpty()
    })

    const onEditorStateChange = (editorData) => {
        // console.log(editorData.getCurrentContent())
        let HTMLdata = stateToHTML(editorData.getCurrentContent())

        setEditorData({
            editorState:editorData
        });

        props.setEditorState(HTMLdata)
    }

    return(
        <Paper variant={'outlined'}>
            <InputLabel variant={'standard'} shrink={true}>{props.label}</InputLabel>
            <Editor
                editorState={editorData.editorState}
                onEditorStateChange={onEditorStateChange}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onBlur={props.setEditorBlur}
            />
        </Paper>
    )

}

export default WYSIWYG;
