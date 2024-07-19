const Handlebars = require('handlebars');

module.exports = {
  registerHelpers: () => {
    Handlebars.registerHelper('parseAddress', (address, part) => {
      // Split the address into parts by commas
      const parts = address.split(',');

      // Handle address with at least city, state, and zip
      if (parts.length >= 2) {
        if (part === 'line1') {
          // Return the first part if it's the street address, or an empty string
          return parts.length > 2 ? parts.slice(0, -1).join(',').trim() : '';
        }
        if (part === 'line2') {
          // Return the city, state, and zip as one line
          return parts.slice(-2).join(',').trim();
        }
      }

      // Fallback if address format is unexpected
      return address;
    });

    Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });
  }
};
