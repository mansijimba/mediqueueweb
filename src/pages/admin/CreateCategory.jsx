import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCreateCategory } from '../../hooks/admin/useAdminCategory'

export default function CreateCategory() {
    const {mutate, data, error, isPending} = useCreateCategory()
    const ValidationSchema = Yup.object(
        {
            name: Yup.String().required("Name required"),
            image: Yup.mixed ().nullable().test(
                "fileSize",
                "File to large",
                (value) => !value || (value && value.size <= 5*1024*1024)
            )
        }
    )
    const formik = useFormik (
        {
            initialValues: {
                name: "",
                image: ""
            },
            validationSchema,
            onSubmit: (values) => {
                const formData = new FormData() //multipart request
                formData.append("name", values.name)
                if(values.image) formData.append("image", values.image)
                mutate(formData,{
                       onSuccess: () => {
                        formik.resetForm() // reset fields
                       }
            })
            }
        }
    )
  return (
    <div>
        CreateCategory
        <form onSubmit={form.handleSubmit}>
            <label>Category Name</label>
            <imput
                name='name'
                onChange={formik.handleChange}
                value={formik.values.name}
                >
                </imput>
                {formik.touched && formik.errors.name && <>{formik.errors.name}</>}
                <label>Category Image</label>
                <input
                    name='iamge'
                    type='file'
                    accept='image/*'
                    onChange={
                        (e)=> {
                            const file=e.currentTarget.files[0]
                            if(file) formik.setFieldValue("iamge", file)
                        }
                    }
                ></input>
                { formik.touched.image && formik.errors.image && <>{formik.errors.image}</>}
                {
                    formik.values.image &&
                <img>
                    className = 'w-32 h-32 object cover'
                    src= {URL.createObjectURL(formik.values.image)}
                </img>
                }
                <button type = 'submit'>Create</button>

        </form>
        </div>
  )
}
