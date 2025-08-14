import HeroSlider from "./HeroSlider";
import MovieCard from "./MovieCard";


interface Movie {
  title: string;
  genre: string;
  likes: string;
  poster: string;
  promoted?: boolean;
}

const movies: Movie[] = [
  {
    title: "Coolie",
    genre: "Action/Thriller",
    likes: "1.1M Likes",
    poster:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@like_202006280402.png,lx-24,ly-617,w-29,l-end:l-text,ie-MS4xTSBMaWtlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end:l-text,ie-UFJPTU9URUQ%3D,co-FFFFFF,bg-DC354B,ff-Roboto,fs-20,lx-N16,ly-12,lfo-top_right,pa-12_14_12_14,r-6,l-end/et00395817-qjtckyrarb-portrait.jpg",
    promoted: true,
  },
  {
    title: "War 2",
    genre: "Action/Thriller",
    likes: "1.1M Likes",
    poster:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@like_202006280402.png,lx-24,ly-617,w-29,l-end:l-text,ie-MS4xTSBMaWtlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00356501-zxqqwrkykt-portrait.jpg",
  },
  {
    title: "Thalaivan Thalaivii",
    genre: "Comedy/Drama/Romantic",
    likes: "8.1/10 31K Votes",
    poster:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC4xLzEwICAzMUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00444587-gpgzelpbny-portrait.jpg",
  },
  {
    title: "Mahavatar Narsimha",
    genre: "Action/Animation/Drama",
    likes: "9.7/10 211.5K Votes",
    poster:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS43LzEwICAyMTEuNUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00429289-nmmqrhcemr-portrait.jpg",
  },
  {
    title: "Housemates",
    genre: "Comedy/Fantasy/Horror",
    likes: "8.8/10 2.5K Votes",
    poster:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC44LzEwICAyLjVLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00453739-wvxnctsylx-portrait.jpg",
  },
  {
    title: "Mahavatar Narsimha",
    genre: "Action/Animation/Drama",
    likes: "9.7/10 211.5K Votes",
    poster:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS43LzEwICAyMTEuNUsgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00429289-nmmqrhcemr-portrait.jpg",
  },
  {
    title: "Housemates",
    genre: "Comedy/Fantasy/Horror",
    likes: "8.8/10 2.5K Votes",
    poster:
      "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC44LzEwICAyLjVLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00453739-wvxnctsylx-portrait.jpg",
  },
];

export default function MainPage(): React.ReactElement {
  return (
    <div>
      <HeroSlider />
    <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recommended Movies</h2>
          <span className="text-red-500 text-sm cursor-pointer">See All ›</span>
        </div>
        <div className="flex gap-4 mt-4 overflow-x-auto pb-4 max-w-7xl mx-auto">
          {movies.map((m, i) => (
            <MovieCard key={i} movie={m} />
          ))}
        </div>
    </div>
  );
}
