const validate = (form) => {

    let errors = {};

    if (!form.name) {
        errors.name = "The Name Cannot Be Empty";
    }
        
    if (!/^[A-Za-z\s]+$/.test(form.name)) {
        errors.name = "The Name Should Only Contain Letters"
    }

    if (form.name.length < 3 || form.name.length > 70) {
        errors.name = "The Name Must Be Between 3 and 70 Characters";
    }

    if (!form.price) {
        errors.price = "The Price Cannot Be Empty";
    }

    if (!/^\d+$/.test(form.price)) {
        errors.price = "The Price Should Only Contain Numbers";
    }

    if (!form.quantity) {
        errors.quantity = "The Quantity Cannot Be Empty";
    }   
    
    if (!/^\d+$/.test(form.quantity)) {
        errors.quantity = "The Quantity Should Only Contain Numbers";
    }

    if (!form.code) {
        errors.code = "The Code Cannot Be Empty";
    }
    
    if (!/^[0-9]+$/.test(form.code)) {
        errors.code = "The Code Should Only Contain Numbers"
    }

    if (!/^\d{3}$/.test(form.code)) {
        errors.code = "The code must be 3 digits";
    }

    
    return errors; 
};

export default validate;