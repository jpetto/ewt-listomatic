// helper functions
let common = {
    // courtesy of Wes Bos (http://wesbos.com/introducing-react-for-beginners/)
    formatUSD :  function(cents) {
        return '$' + ( (cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") );
    }
}

export default common;
