import React from 'react';
import { Cat } from '../App';
import { Heart, RefreshCw, Camera } from 'lucide-react';

interface ResultsProps {
  likedCats: Cat[];
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ likedCats, onReset }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-pink-200 fill-current" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Your Matches!</h1>
          <p className="text-xl text-pink-100">
            You liked <span className="font-bold">{likedCats.length}</span> cats
          </p>
        </div>

        {likedCats.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <Camera className="w-16 h-16 text-white/60 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No matches yet!</h2>
            <p className="text-pink-100 mb-6">
              Maybe you're just too picky? 😸
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-8">
            {likedCats.map((cat, index) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-200"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <img
                  src={cat.url}
                  alt={`Liked cat ${cat.id}`}
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <div className="flex items-center justify-center">
                    <Heart className="w-5 h-5 text-red-500 fill-current" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onReset}
          className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-200 flex items-center justify-center space-x-3 border border-white/20"
        >
          <RefreshCw className="w-6 h-6" />
          <span className="text-lg">Find More Cats</span>
        </button>

        {likedCats.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-pink-100 text-sm">
              💝 Thanks for giving these kitties some love!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;