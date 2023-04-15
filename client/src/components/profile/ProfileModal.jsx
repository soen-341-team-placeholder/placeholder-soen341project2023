import {useState} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {array, number, string, z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import Cookies from "universal-cookie";

import * as api from '../Function'

const schema = z.object({
    firstName: string().min(1, {message: "First Name is required"}),
    lastName: string().min(1, {message: "Last Name is required"}),
    email: string().email(),
    age: number().gt(12, {message: "You must be thirteen or older"}),
    biography: string(),
    companyName: string(),
    education: array(z.object({
        schoolName: string().min(1, {message: "You must provide a school name"}),
        degree: string().min(1, {message: "You must indicate your degree name"}),
        startDate: string(),
        endDate: string()
    }),),
    workExperience: array(z.object({
        companyName: string().min(1, {message: "You must indicate the company name"}),
        startDate: string(),
        endDate: string()
    }),),
});

const ProfileModal = ({user, onClose, onSave, isAnEmployer}) => {
    const {register, control, handleSubmit, formState} = useForm({
        defaultValues: user, resolver: zodResolver(schema)
    });

    const {errors} = formState;

    const {fields: educationFields, append: appendEducation, remove: removeEducation} = useFieldArray({
        control, name: "education",
    });

    const {fields: workExperienceFields, append: appendWorkExperience, remove: removeWorkExperience} = useFieldArray({
        control,
        name: "workExperience",
    });

    const onSubmit = (formValues) => {
        const cookies = new Cookies()
        const userId = cookies.get('userId')

        api.updateUserProfile(userId, formValues)
        console.log(formValues);
        onSave(formValues);
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleSubmit(onSubmit)} className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First
                                Name</label>
                            <input
                                {...register("firstName")}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                id="firstName"
                            />
                            <div className="text-red-500 text-xs italic">{errors.firstName?.message}</div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last
                                Name</label>
                            <input
                                {...register("lastName")}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                id="lastName"
                            />
                            <div className="text-red-500 text-xs italic">{errors.lastName?.message}</div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">E-mail</label>
                            <input
                                {...register("email")}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                id="email"
                            />
                            <div className="text-red-500 text-xs italic">{errors.email?.message}</div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age</label>
                            <input
                                {...register("age", {valueAsNumber: true})}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                id="age"
                            />
                            <div className="text-red-500 text-xs italic">{errors.age?.message}</div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="biography"
                                   className="block text-gray-700 text-sm font-bold mb-2">Biography</label>
                            <textarea
                                {...register("biography")}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="biography"
                            ></textarea>
                            <div className="text-red-500 text-xs italic">{errors.biography?.message}</div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-2">Company
                                Name</label>
                            <input
                                {...register("companyName")}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                id="companyName"
                            />
                            <div className="text-red-500 text-xs italic">{errors.companyName?.message}</div>
                        </div>
                        {/* Education */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Education</label>
                            {educationFields.map((item, index) => (
                                <div key={item.id} className="mb-4">
                                    <div className="mb-2">
                                        <label htmlFor={`education.${index}.schoolName`}
                                               className="block text-gray-700 text-sm font-bold mb-2">School
                                            Name</label>

                                        <input
                                            {...register(`education.${index}.schoolName`)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id={`education.${index}.schoolName`}
                                            defaultValue={item.schoolName}
                                        />
                                        <div
                                            className="text-red-500 text-xs italic">{errors.education?.[index]?.schoolName?.message}</div>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor={`education.${index}.degree`}
                                               className="block text-gray-700 text-sm font-bold mb-2">Degree</label>
                                        <input
                                            {...register(`education.${index}.degree`)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id={`education.${index}.degree`}
                                            defaultValue={item.degree}
                                        />
                                        <div
                                            className="text-red-500 text-xs italic">{errors.education?.[index]?.degree?.message}</div>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor={`education.${index}.startDate`}
                                               className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                                        <input
                                            {...register(`education.${index}.startDate`)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id={`education.${index}.startDate`}
                                            defaultValue={item.startDate}
                                        />
                                        <div
                                            className="text-red-500 text-xs italic">{errors.education?.[index]?.startDate?.message}</div>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor={`education.${index}.endDate`}
                                               className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                                        <input
                                            {...register(`education.${index}.endDate`)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id={`education.${index}.endDate`}
                                            defaultValue={item.endDate}
                                        />
                                        <div
                                            className="text-red-500 text-xs italic">{errors.education?.[index]?.endDate?.message}</div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeEducation(index)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => appendEducation({})}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Add Education
                            </button>
                        </div>

                        {/* Work Experience */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Work Experience</label>
                            {workExperienceFields.map((item, index) => (
                                <div key={item.id} className="mb-4">
                                    <div className="mb-2">
                                        <label htmlFor={`workExperience.${index}.companyName`}
                                               className="block text-gray-700 text-sm font-bold mb-2">Work</label>
                                        <input
                                            {...register(`workExperience.${index}.companyName`)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id={`workExperience.${index}.companyName`}
                                            defaultValue={item.companyName}
                                        />
                                        <div
                                            className="text-red-500 text-xs italic">{errors.workExperience?.[index]?.companyName?.message}</div>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor={`workExperience.${index}.startDate`}
                                               className="block text-gray-700 text-sm font-bold mb-2">Start Date</label>
                                        <input
                                            {...register(`workExperience.${index}.startDate`)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id={`workExperience.${index}.startDate`}
                                            defaultValue={item.startDate}
                                        />
                                        <div
                                            className="text-red-500 text-xs italic">{errors.workExperience?.[index]?.startDate?.message}</div>
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor={`workExperience.${index}.endDate`}
                                               className="block text-gray-700 text-sm font-bold mb-2">End Date</label>
                                        <input
                                            {...register(`workExperience.${index}.endDate`)}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            type="text"
                                            id={`workExperience.${index}.endDate`}
                                            defaultValue={item.endDate}
                                        />
                                        <div
                                            className="text-red-500 text-xs italic">{errors.workExperience?.[index]?.endDate?.message}</div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeWorkExperience(index)}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => appendWorkExperience({})}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Add Work Experience
                            </button>
                        </div>

                        {/* Save button */}
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-gray-500 text-white px-6 py-2 rounded-md mr-2"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal;
