"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Component1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

const ImagesCollection = () => {
  const [query, setQuery] = useState("Alien");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [displayCount, setDisplayCount] = useState(4);
  const [page, setPage] = useState(1);
  const perPage = 6;

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=${perPage}&page=${page}`,
        {
          headers: {
            Authorization:
              "93Svi0hmP7nbxSC8afQ1ugwhhTD9nqzisA9d4wzR7a3KpafZrsLwdGFA",
          },
        }
      );
      const data = await response.json();
      if (data.photos) {
        setImages(data.photos);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const goToNextPage = () => {
    setPage(page + 1);
    handleSearch();
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      handleSearch();
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-sm flex flex-row items-center space-x-2  ">
          <Input
            type="search"
            placeholder="Search for Images"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            className="bg-background text-foreground border border-foreground  dark:bg-background dark:text-foreground "
          />

          <Button
            type="submit"
            onClick={handleSearch}
            className="border border-foreground  dark:border-foreground "
            disabled={isLoading}
          >
            {isLoading ? (
              <Component1Icon className="animate-spin" />
            ) : (
              <MagnifyingGlassIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-wrap mt-5 bg-background text-foreground dark:bg-background dark:text-foreground">
          {images.slice(0, displayCount).map((image) => (
            <div
              key={image.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2 dark:border-foreground "
              style={{ height: "200px" }}
            >
              <img
                src={image.src.medium}
                alt={image.photographer}
                className="w-full h-full object-cover"
                onClick={() => setSelectedImage(image.src.large2x)}
              />
              
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-between  p-8 bg-background text-foreground dark:bg-background dark:text-foreground">
        <Button onClick={goToPreviousPage}>Previous Page</Button>
        <Button onClick={goToNextPage}>Next Page</Button>
      </div>

      {displayCount < images.length && (
        <Button onClick={() => setDisplayCount((count) => count + 4)}>
          Load more
        </Button>
      )}

      {selectedImage && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="enlarged"
            className="max-h-full max-w-full "
          />
        </div>
      )}
    </>
  );
};

export default ImagesCollection;
