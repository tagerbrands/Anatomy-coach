const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const homeBtnPinPoint = `
                <button 
                  onClick={() => {
                    setIsPinPointFinished(false);
                    setActiveTab('bieb');
                  }} 
                  className="w-full py-3 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2 mt-3"
                >
                  <Library className="w-5 h-5" />
                  🏠 Terug naar Startmenu
                </button>`;

const searchStr1 = `                  Speel Nog Een Ronde
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Flex Card for Nerve HTML2Canvas Export */}`;

content = content.replace(searchStr1, `                  Speel Nog Een Ronde
                </button>${homeBtnPinPoint}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Flex Card for Nerve HTML2Canvas Export */}`);


const searchStr2 = `                  Speel Nog Een Ronde
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* iOS Install Modal */}`;
      
const homeBtnNerve = `
                <button 
                  onClick={() => {
                    setIsNerveFinished(false);
                    setActiveTab('bieb');
                  }} 
                  className="w-full py-3 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 transition-all flex items-center justify-center gap-2 mt-3"
                >
                  <Library className="w-5 h-5" />
                  🏠 Terug naar Startmenu
                </button>`;

content = content.replace(searchStr2, `                  Speel Nog Een Ronde
                </button>${homeBtnNerve}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* iOS Install Modal */}`);

fs.writeFileSync('src/App.tsx', content);
