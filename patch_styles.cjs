const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// For Elastiek
// <div className="relative flex-1 min-h-[350px] mb-4 bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center py-4">
const oldElastiekPlayfield = `<div className="relative flex-1 min-h-[350px] mb-4 bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center py-4">`;
const newElastiekPlayfield = `<div className="relative flex-1 min-h-0 mb-4 bg-slate-900/60 rounded-3xl border border-white/10 overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center p-2 sm:p-4">`;

content = content.replace(oldElastiekPlayfield, newElastiekPlayfield);

// <div className="relative inline-block h-[350px] max-w-full">
const oldElastiekImgContainer = `<div className="relative inline-block h-[350px] max-w-full">`;
const newElastiekImgContainer = `<div className="relative inline-block h-full w-full flex items-center justify-center">`;

content = content.replace(oldElastiekImgContainer, newElastiekImgContainer);

// <img \n                  src={currentPracticeMuscle.visualisatie.basis_weergave} \n                  alt="Skelet" \n                  className="h-full w-auto object-contain pointer-events-none opacity-80 mix-blend-screen"
const oldElastiekImg = `className="h-full w-auto object-contain pointer-events-none opacity-80 mix-blend-screen"`;
const newElastiekImg = `className="max-h-full max-w-full object-contain pointer-events-none opacity-80 mix-blend-screen"`;

content = content.replace(oldElastiekImg, newElastiekImg);

// Control panel: <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-4 sm:p-6 shadow-2xl shrink-0">
const oldControl = `<div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-4 sm:p-6 shadow-2xl shrink-0">`;
const newControl = `<div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-3 sm:p-6 shadow-2xl shrink-0">`;

content = content.replace(oldControl, newControl);

// Nerves Grid
const oldNervesGrid = `<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 flex-1 content-center">`;
const newNervesGrid = `<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-2 flex-1 content-center min-h-0 overflow-y-auto scrollbar-hide">`;

content = content.replace(oldNervesGrid, newNervesGrid);

// Zenuwen action bar
const oldNervesActionBar = `<div className="flex justify-between items-center h-12">`;
const newNervesActionBar = `<div className="flex justify-between items-center h-12 shrink-0 pb-4">`;
content = content.replace(oldNervesActionBar, newNervesActionBar);

fs.writeFileSync('src/App.tsx', content);
