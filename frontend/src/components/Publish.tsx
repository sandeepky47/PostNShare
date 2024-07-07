import { Appbar } from "../components/Appbar"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { json, useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import React, { memo, useEffect, useRef } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../tools/editortool";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dbData, setDbData] = useState("");
    const navigate = useNavigate();
    const currentDateTime = new Date().toISOString();

    // var data: any = undefined;
    // var textData: any;
    // var postContent: any;

    // const ref: any = useRef();
    // useEffect(() => {
    //     if (!ref.current) {
    //         const editor = new EditorJS({
    //             holder: "editorjs-container",
    //             tools: EDITOR_JS_TOOLS,
    //             // data: data,
    //             async onChange(api) {
    //                 data = await api.saver.save();
    //                 textData = data;
    //                 postContent = GetContent(textData);
    //                 console.log(`PostContent...${postContent}`);
    //                 console.log(JSON.stringify(data));
    //                 console.log(GetContent(textData));
    //             },
    //         });

    //         ref.current = editor;
    //     }

    //     return () => {
    //         if (ref.current && ref.current.destroy) {
    //             ref.current.destroy();
    //         }
    //     };
    // }, []);

    return <div>
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />

                 <TextEditor onChange={(e) => {
                    setDescription(e.target.value)
                }} />
                {/* <div id="editorjs-container" /> */}
                {/* <Editor data={data}  
                editorblock="editorjs-container"/> */}

                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content: description,
                        publishDateTime: currentDateTime
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': 10,
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Publish post
                </button>
            </div>
        </div>
    </div>
}


function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>

}


// const GetContent = (data: any) => {

//     console.log(`Inside GetContent......${data.blocks[0].data.text}`)
//     return data.blocks[0].data.text;

// }

// const Editor = ({ data, editorblock }: any) => {
//     const ref: any = useRef();
//     console.log(`Data initial.............${data}`);
//     //Initialize editorjs
//     useEffect(() => {
//         //Initialize editorjs if we don't have a reference
//         if (!ref.current) {
//             const editor = new EditorJS({
//                 holder: editorblock,
//                 tools: EDITOR_JS_TOOLS,
//                 data: data,
//                 async onChange(api) {
//                     const data = await api.saver.save();
//                     console.log(`Data inside onChange().............${data}`);
//                     console.log(JSON.stringify(data));
//                 },
//             });
//             ref.current = editor;
//         }

//         console.log(JSON.stringify(data));
//         console.log(`Data last.............${data}`);

//         //Add a return function to handle cleanup
//         return () => {
//             if (ref.current && ref.current.destroy) {
//                 ref.current.destroy();
//             }
//         };
//     }, []);
//     return <div id={editorblock} />;
// };

// export default memo(Editor);