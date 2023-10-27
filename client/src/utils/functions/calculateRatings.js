export default function calculateRatingPercentage(ratings, index) {
    if(!ratings) return 0;
    const totalRatings=ratings.reduce((a,b)=>a+1,0);
    const currentRatingCount=ratings.reduce((a,b)=> b===index ? a+1 : a,0);
    const otherRatingCount=ratings.reduce((a,b)=> b===index ? a : a+1,0);
    const percentage = (currentRatingCount / totalRatings) * 100;
    return percentage || 0;
}