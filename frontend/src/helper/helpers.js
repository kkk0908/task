// import clonedeep from 'lodash';

export const deepCopy = (data) => {
  return JSON.parse(JSON.stringify(data));
};

export default Object.freeze({
  getSearchParams(str) {
    return new URLSearchParams(str);
  },
  replaceQueryParam(param, newval, search) {
    /*
              param is search param id
              newval newvalue to that param
              search is the window.location.search or ur custom search string
          */

    let regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    let query = search.replace(regex, "$1").replace(/&$/, "");

    return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : "");
  },
  toUnixTimestamp: (strDate) => {
    //let strDate = 08/30/2018 23:21:30;  mm/dd/yyy  hh/mm/ss
    var datum = Date.parse(strDate);
    return datum / 1000;
  },
  toDateTime: (unixtimestamp) => {
    // Unixtimestamp
    //var unixtimestamp = document.getElementById('timestamp').value;
    var months_arr = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var date = new Date(unixtimestamp * 1000);
    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var convdataTime =
      month +
      "/" +
      day +
      "/" +
      year +
      " " +
      hours +
      ":" +
      minutes.substr(-2) +
      ":" +
      seconds.substr(-2);
    return convdataTime;
  },
  getTypeOf: (mixed_var) => {
    if (typeof mixed_var === "object") {
      if (typeof mixed_var.map === "function") {
        return "array";
      } else {
        return "object";
      }
    } else {
      return typeof mixed_var;
    }
  },
  isEmpty: (mixed_var) => {
    // console.log(mixed_var)
    if (typeof mixed_var === "object") {
      if (typeof mixed_var.map === "function" && mixed_var.length) {
        //'array'
        return false;
      } else if (Object.keys(mixed_var).length) {
        return false;
      }
      return true;
    } else {
      if (typeof mixed_var === "string") {
        return !mixed_var.trim();
      }
      return !mixed_var;
    }
  },
  nFormatter: (num, digits) => {
    var si = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" },
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  },

  capitalize: (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  },
});

// Object.keys(nodes).map( ( eachType ) => {
//   if(nodes[eachType].hasOwnProperty( clickedNodeProps["parentNodeId"] )){
//     let parentNode = nodes[eachType][clickedNodeProps["parentNodeId"]];
//     Object.keys(parentNode["manipulationNodes"]).map( ( eachManpType ) => {
//       if( parentNode[eachManpType].hasOwnProperty(clickedNodeProps["nodeId"]) ){
//         const currentNode = parentNode[eachManpType][clickedNodeProps["nodeId"]];
//       }
//     } );
//   }
// } );
