"use client";

import { useState, useEffect } from "react";
import data from "@emoji-mart/data";
import { motion } from "framer-motion";
import Dialog from "@mui/material/Dialog";
import dynamic from "next/dynamic";
import { downloadCover } from "../utils/handleDownload";

const TwitterPicker = dynamic(
  () => import("react-color/lib/components/twitter/Twitter"),
  { ssr: false }
);
const Picker = dynamic(() => import("@emoji-mart/react"), { ssr: false });

type Emoji = {
  id: string;
  native: string;
  keywords: string[];
  shortcodes: string;
  skins?: Array<{
    unified: string;
    native: string;
  }>;
};

type Category = {
  id: string;
  emojis: string[];
};

type EmojiDataType = {
  aliases: Record<string, string>;
  categories: Category[];
  emojis: Record<string, Emoji>;
  sheet: { cols: number; rows: number };
};

export type EmojiDisplay = {
  id: string;
  native: string;
};

const randomEmojis = (): EmojiDisplay[] => {
  const parsedData = data as EmojiDataType;

  const targetCategories = ["people", "foods", "smileys"];
  const filteredEmojis: EmojiDisplay[] = [];

  parsedData.categories.forEach((category) => {
    if (targetCategories.includes(category.id)) {
      category.emojis.forEach((emojiId) => {
        const emoji = parsedData.emojis[emojiId];
        if (emoji?.skins?.[0]?.native) {
          filteredEmojis.push({
            id: emoji.id,
            native: emoji.skins[0].native,
          });
        }
      });
    }
  });

  const selectedEmojis: EmojiDisplay[] = [];
  while (selectedEmojis.length < 12 && filteredEmojis.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredEmojis.length);
    const randomEmoji = filteredEmojis.splice(randomIndex, 1)[0];
    selectedEmojis.push(randomEmoji);
  }

  return selectedEmojis;
};

const CoverGrid = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [color, setColor] = useState("#fff");
  const [emojis, setEmojis] = useState<EmojiDisplay[]>([]);
  const handleDownload = () => {
    const isMobile = window.innerWidth <= 768; // Simple check for mobile devices
    downloadCover(emojis, color, isMobile);
  };

  // const handleDownload = () => {
  //   const isMobile = window.innerWidth <= 768;
  //   const backgroundColor = color;

  //   if (isMobile) {
  //     downloadEmojiGridSVG(emojis, backgroundColor); // SVG for mobile
  //   } else {
  //     downloadCover(emojis, color, isMobile)
  //   }
  // };

  useEffect(() => {
    // Generate emojis on the client side
    setEmojis(randomEmojis());
  }, []);

  const handleEmojiClick = (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSelected(index);
    setAnchorEl(event.currentTarget);
  };

  const handleReplaceEmoji = (newEmoji: EmojiDisplay) => {
    if (selected !== null) {
      const updatedEmojis = [...emojis];
      updatedEmojis[selected] = newEmoji;
      setEmojis(updatedEmojis);
      setSelected(null);
      setAnchorEl(null);
    }
  };

  const handleClearGrid = () => {
    setEmojis(Array(12).fill({ id: "", native: "" }));
  };

  const handleRegenerateGrid = () => {
    setEmojis(randomEmojis());
  };

  useEffect(() => {
    setEmojis(randomEmojis());
  }, []);

  return (
    <div className="flex flex-col items-center mt-1">
      <div className="grid-body mx-auto">
        <div className="cover relative h-auto aspect-square bg-white flex justify-center items-center rounded-md shadow-md px-4 m-auto w-fit">
          <div className="emoji-grid grid grid-cols-4 grid-rows-3 gap-2 motion-preset-fade ">
            {emojis.map((emoji, index) => (
              <div
                key={index}
                className={`emoji-container flex justify-center items-center transition-opacity opacity-100 ${
                  selected === index ? "ring-2 ring-blue-400 rounded" : ""
                }`}
              >
                <motion.button
                  key={emoji.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: emoji.native === "" ? 1 : 1.1 }}
                  whileTap={{ scale: emoji.native === "" ? 1 : 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`emoji-button w-[20vw] h-[20vw] max-w-[80px] max-h-[80px] rounded-lg flex justify-center items-center ${
                    emoji.native === ""
                      ? "bg-gray-200"
                      : "bg-transparent hover:ring-2 hover:ring-blue-300"
                  }`}
                  onClick={(e) => handleEmojiClick(index, e)}
                >
                  <span className="text-5xl md:text-5xl">
                    {emoji.native || ""}
                  </span>
                </motion.button>
              </div>
            ))}
          </div>
        </div>

        <div className="actions flex flex-col md:flex-row gap-3 mt-6">
          <button
            onClick={handleRegenerateGrid}
            className="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Regenerate Grid
          </button>

          <button
            onClick={handleClearGrid}
            className="w-full md:w-auto px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition motion-preset-slide-right-sm"
          >
            Remove All Emojis
          </button>
          <button
            onClick={handleDownload}
            className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition hover:animate-pulse"
          >
            Download Cover
          </button>
        </div>
      </div>

      <div className="mt-5 w-full max-w-[90vw] animate-fade-in">
        <TwitterPicker
          color={color}
          onChangeComplete={(color) => setColor(color.hex)}
          width="100%"
        />
      </div>

      <Dialog
        className="w-auto animate-slide-up"
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={{
          "& .MuiPaper-root": {
            margin: 0,
            padding: 0,
          },
        }}
      >
        <div className="w-full max-w-sm mx-auto">
          <Picker
            style={{ margin: "0 !important" }}
            data={data}
            onEmojiSelect={(emoji: Emoji) =>
              handleReplaceEmoji({ id: emoji.id, native: emoji.native })
            }
            theme="light"
          />
          <div className="p-4">
            <button
              onClick={() => {
                if (selected !== null) {
                  const updatedEmojis = [...emojis];
                  updatedEmojis[selected] = { id: "", native: "" };
                  setEmojis(updatedEmojis);
                  setSelected(null);
                  setAnchorEl(null);
                }
              }}
              className="mt-4 w-full px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
            >
              Delete Emoji
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CoverGrid;
