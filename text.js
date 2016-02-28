// var TextBuilder = {
//
//   // sentences is the number of full sentences (period to period) will be returned.
//   sentences: 2,
//   stringArray: [],
//   startIndex: 0,
//   endIndex: 0,
//
//   runThis: function() {
//     TextBuilder.splitter();
//     TextBuilder.findStartEnd();
//     console.log("startIndex is: " + TextBuilder.startIndex);
//     console.log("endIndex is: " + TextBuilder.endIndex);
//     TextBuilder.buildSentences();
//     console.log("textA is now: " + Game.textA);
//   },
//
//   getRandom: function(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   },
//
//   splitter: function() {
//     var findTextSrc = minionArray[Game.roundNumber].textsrc;
//     var re = /\./g;
//     console.log(findTextSrc);
//     if (findTextSrc === "discworld") {
//       var loadTextSrc = TextSource.discworld.replace(re, " .");
//       console.log(loadTextSrc);
//       TextBuilder.stringArray = loadTextSrc.split(" ");
//       console.log("discworld loaded into stringArray");
//     } else if (findTextSrc === "storm") {
//       var loadTextSrc = TextSource.storm.replace(re, " .");
//       console.log(loadTextSrc);
//       TextBuilder.stringArray = loadTextSrc.split(" ");
//       console.log("storm loaded into stringArray");
//     } else {
//       console.log("TextBuilder splitter is broken.")
//     };
//   },
//
//   findStartEnd: function() {
//     var indices = [];
//     var element = ".";
//     var index = TextBuilder.stringArray.indexOf(element);
//       while (index != -1) {
//         indices.push(index);
//         index = TextBuilder.stringArray.indexOf(element, index + 1);
//       };
//     console.log("Indices found: " + indices);
//     var indicesRandom = indices[TextBuilder.getRandom(0, indices.length)];
//     var indicesRandomIndex = indices.indexOf(indicesRandom);
//     console.log("indicesRandomIndex: " + indicesRandomIndex);
//     var indicesEnd = indicesRandomIndex + (TextBuilder.sentence + 1);
//     TextBuilder.startIndex = indicesRandom;
//     TextBuilder.endIndex = indices[indicesEnd];
//   },
//
//   buildSentences: function() {
//     var sentenceArray = TextBuilder.stringArray.slice(TextBuilder.startIndex, TextBuilder.endIndex);
//     console.log("sentenceArray: " + sentenceArray);
//     Game.textA = sentenceArray.join(" ");
//   },
// };

//begin "Begin." followed by a space, and end with a period, or it won't work. Backslash all commas, in addition to any quotation marks.

var textSource = "Begin. Damp darkness shrouded the venerable buildings of Unseen University\, premier college of wizardry. The only light was a faint octarine flicker from the tiny windows of the new High Energy Magic building\, where keen-edged minds were probing the very fabric of the universe\, whether it liked it or not. And there was light\, of course\, in the Library. The Library was the greatest assemblage of magical texts anywhere in the multiverse. Thousands of volumes of occult lore weighted its shelves. It was said that\, since vast amounts of magic can seriously distort the mundane world\, the Library did not obey the normal rules of space and time. It was said that it went on forever. It was said that you could wander for days among the distant shelves\, that there were lost tribes of research students somewhere in there\, that strange things lurked in forgotten alcoves and were preyed on by other things that were even stranger. Wise students in search of more distant volumes took care to leave chalk marks on the shelves as they roamed deeper into the fusty darkness\, and told friends to come looking for them if they weren’t back by supper. And\, because magic can only loosely be bound\, the Library books themselves were more than mere pulped wood and paper. Raw magic crackled from their spines\, earthing itself harmlessly in the copper rails nailed to every shelf for that very purpose. Faint traceries of blue fire crawled across the bookcases and there was a sound\, a papery whispering\, such as might come from a colony of roosting starlings. In the silence of the night the books talked to one another. There was also the sound of someone snoring. The light from the shelves didn’t so much illuminate as highlight the darkness\, but by its violet flicker a watcher might just have identified an ancient and battered desk right under the central dome. The snoring was coming from underneath it\, where a piece of tattered blanket barely covered what looked like a heap of sandbags but was in fact an adult male orangutan. It was the Librarian. Not many people these days remarked upon the fact that he was an ape. The change had been brought about by a magical accident\, always a possibility where so many powerful books are kept together\, and he was considered to have got off lightly. After all\, he was still basically the same shape. And he had been allowed to keep his job\, which he was rather good at\, although “allowed” is not really the right word. It was the way he could roll his upper lip back to reveal more incredibly yellow teeth than any other mouth the University Council had ever seen before that somehow made sure the matter was never really raised. But now there was another sound\, the alien sound of a door creaking open. Footsteps padded across the floor and disappeared among the clustering shelves. The books rustled indignantly\, and some of the larger grimoires rattled their chains. The Librarian slept on\, lulled by the whispering of the rain."
