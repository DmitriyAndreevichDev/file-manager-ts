import React, {useState} from 'react';
import ControlBar from "./component/ControlBar";
import File from "./component/elements/File";
import './App.css';
import PopUp from "./component/popUp/PopUp";

import PopupFile from "./component/popUp/PopupFile";
import {useSelector} from "react-redux";
import {FileType} from "./Redux/filesReducer";
import {ReducersType} from "./Redux/store";


const App: React.FC = () => {
    const [activeFile, setActiveFile] = useState(``);

    const files = useSelector((state: ReducersType) => state.files.files);
    const currentDir = useSelector((state: ReducersType) => state.files.currentDir);
    const currentFiles = files.filter((file: FileType) => file.parentId === currentDir);

    const toggleActiveStyles = (el: string): string => {
        if (el === activeFile) {
            return `box active`
        } else {
            return `box inactive`
        }
    };


    return (
        <div className="App">
            <ControlBar/>
            <div className={`content`}>
                <PopUp/>
                <PopupFile/>
                <div className={`content__files-wrap`}>
                    {
                        currentFiles.map((file: FileType) =>
                            <div
                                className={toggleActiveStyles(file.id)}
                                onClick={() => {
                                    setActiveFile(file.id)
                                }}

                            >
                                <File key={file.id} file={file}/>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default App;
