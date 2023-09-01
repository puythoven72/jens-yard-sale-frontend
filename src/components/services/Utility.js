

class Utility{
    formatDate(date){
      return  new Date(date).toLocaleDateString()
    }



    formatCurrency = (value) =>

    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);





}
export default new Utility;