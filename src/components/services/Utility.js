

class Utility{
    formatDate(date){
      return  new Date(date).toLocaleDateString()
    }



    formatCurrency = (value) =>

    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);



    formatProperCase(value){
      let result = "";
      const words = value.split(' ');
      for (const word of words) {
        console.log(word[0].toUpperCase() + word.slice(1) + " is the word");
       result = result +" " +  word[0].toUpperCase() + word.slice(1).toLowerCase() ;
      }
      return result;

    }




    setFormField = (field, value,setForm,form,setErrors,errors) => {
      console.log(field + " IS THE FIELD");
      console.log(value + " IS THE VALUE");
      console.log(form + " IS FORM");
      setForm({
        ...form,
        [field]: value,
      });
      if (!!errors[field]) {
        setErrors({
          ...errors,
          [field]: null,
        });
      }
      return form;
    };





}
export default new Utility;