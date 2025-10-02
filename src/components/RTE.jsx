import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
//controller works like an forward ref in controller we add things which we want to use in the react hook form
//control comes from react hook form and this control is responsible to pass the state of this component to that form where we use this component
export default function RTE({name,control,label,defaultValue=""}){
    return(
        <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>
        {label}</label>}

        {/* controller pass the control to form */}

        <Controller
        name={name || "editor"}
        control={control}
        render={({field:{onChange}})=>(

        <Editor
        apiKey='jlcgz7gi5ok4e7po3pilx1gi3zi6b5deomfxf49a7wgrd79y'
        initialValue={defaultValue}
        init={{
          height: 300,
          menubar: true,
          plugins: [
            'advlist autolink lists link image charmap preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help',
          content_style:"body {font-family:Helvetica,Arial,sans-serif; font-size:14px}"   
        }}
        onEditorChange={onChange}
        />
        )}
        />

        </div>
    )
}