function sortCheck(ages){
    let verdict = "";
    for (let item =  1; item < ages.length  + 1; item++){
        const topDate = new Date(ages[item - 1]);
        const currDate = new Date (ages[item]);

        if (topDate < currDate){
            return verdict = "Posts are not sorted from newest to oldest";
        }

        if (!verdict.length){
            return verdict = "Posts are sorted from newest to oldest";
        }
    };
};

module.exports = sortCheck;