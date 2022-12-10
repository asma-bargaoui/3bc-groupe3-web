//typically we wloud store in{process.env.API_KEY}? 
const API_KEY="8975643eaf1c65da305800cd7e7f204c";


const requests={
   fetchTrending:'/trending/all/week?api_key=${API_KEY}& language=en-US',
   fetchNetflixOriginals:'/discover/tv?api_key=${API_KEY}& with_networks=213',
   fetchTopRated:'/movie/top_rated?api_key=${API-KEY}& language=en-US',
   fetchActionMovies:'/discover/movie?api_key=${API_key}& with-genres=28',
   fetchComedyMovies:'/discover/movie?api_key=${API_KEY}& with_genres=35',
   fetchHorroMovies:'/discover/movie?api_key=${API_KEY}& with_genres=27',
   fetchRomanceMovie:'/discover/movie?api_key=${API_KEY}& with_genres=10749',
   fetchDocumentaries:'/discover/movie?api_key=${API_KEY}& with-genres=99',
        
};

export default requests;