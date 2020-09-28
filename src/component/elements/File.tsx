import React, {FC} from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {
    setCurrentFile,
    isOpenPopupFile,
    pushToStack,
    setCurrentDir,
    setAddressBar,
    FileType
} from "../../Redux/filesReducer";
//
type PropsType = {
    file: FileType
}

const File: FC<PropsType> = ({file}) => {


    const dispatch = useDispatch();

    const openDirHandler = () => {
        if (file.type === 'dir') {
            dispatch(pushToStack(file));
            dispatch(setCurrentDir(file.id));
            dispatch(setAddressBar(file.path))
        }
    };

    const openFileHandler = () => {
        if (file.type === 'txt') {
            dispatch(setCurrentFile(file.id));
            dispatch(isOpenPopupFile(true));

        }
    };
    const dir = () => {
        return (
            <div>
                <Button onDoubleClick={openDirHandler}>
                    <div className="folder-wrap">
                        <FolderIcon color="primary" fontSize={`large`}/> :
                        <p>{file.name}</p>
                    </div>
                </Button>
            </div>
        )
    };
    const txt = () => {
        return(
            <Button onDoubleClick={openFileHandler}>
                <div className="folder-wrap">
                    <InsertDriveFileIcon color="primary" fontSize={`large`}/>
                    <p>{file.name}</p>
                </div>
            </Button>
        )
    };

    return(
        <div>
            {file.type === `dir` ? dir() : txt()}
        </div>
    )
};

export default File;