import React from 'react';

const CreateRecipe = () => {
    return (
        <form encType='multipart/form-data' action="http://localhost:3001/upload-file" method="post" name="file">
            <input type="file" className="mt-40"/>
            <input type="submit"/>
        </form>
    );
};

export default CreateRecipe;