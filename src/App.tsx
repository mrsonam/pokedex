import React, { useEffect, useState } from 'react';
import './App.css';
import GenerationDropdown from './components/GenerationDropdown';
import PokemonCard from './components/PokemonCard';
import { getPokemonsByGeneration } from './services/pokemon.service';
import { IPokemonsByGeneration } from './interface/pokemon.interface';
import PokemonDetails from './components/PokemonDetails';
import BannerImg from './assets/images/banner.png';
import PartyDrawer from './components/PartyDrawer';
import { Alert, Button } from '@material-tailwind/react';

function App() {
  const [pokemons, setPokemons] = useState<IPokemonsByGeneration[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<number>(0);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [partyDrawerOpen, setPartyDrawerOpen] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<{
    open: boolean;
    content: string;
  }>({
    open: false,
    content: '',
  });

  const getPokemons = async (generationId: number) => {
    const [response, _error] = await getPokemonsByGeneration(generationId);
    if (response) {
      setPokemons(response?.sort((a: any, b: any) => a.id - b.id));
    }
  };

  const handleDetailsClick = (id: number) => {
    setDetailsOpen(true);
    setSelectedPokemon(id);
  };

  // Calculate the top position based on the current scroll position
  const calculateTopPosition = () => {
    const scrolledTop = window.scrollY;
    const topPosition = scrolledTop + 20; // Adjust the value as needed
    return topPosition;
  };

  useEffect(() => {
    if (alertData?.open) {
      const topPosition = calculateTopPosition();
      const alertContainer = document.getElementById('alert-container');
      if (alertContainer) {
        alertContainer.style.top = `${topPosition}px`;
      }
      const timer = setTimeout(() => {
        setAlertData({
          open: false,
          content: '',
        });
      }, 3000);

      return () => {
        clearTimeout(timer); // Clean up the timeout when component unmounts
      };
    }
  }, [alertData]);

  return (
    <>
      <div
        className={`relative w-full min-h-screen bg-gray-100 ${
          partyDrawerOpen && '!overflow-hidden'
        }`}
      >
        <div
          id="alert-container"
          className="absolute z-[99999] right-2 w-full sm:w-1/2"
        >
          <Alert
            open={alertData?.open}
            onClose={() => setAlertData({ open: false, content: '' })}
          >
            {alertData.content}
          </Alert>
        </div>
        {/* <Alert
          open={alertData?.open}
          onClose={() =>
            setAlertData({
              open: false,
              content: '',
            })
          }
          animate={{
            mount: { x: 0 },
            unmount: { x: 1000 },
          }}
          className="absolute right-2 top-2 w-full sm:w-1/2"
        >
          {alertData?.content}
        </Alert> */}
        <div className="flex flex-col items-center justify-center h-full mx-auto p-4 sm:p-6 lg:p-8">
          <img
            src={BannerImg}
            loading="lazy"
            alt="Banner Image"
            className="w-full h-auto max-w-[300px]"
          />
          {pokemons?.length === 0 && (
            <div className="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-center m-5 p-4 sm:p-6 lg:p-8">
              <div className="max-w-[1200px]">
                <h1 className="text-4xl font-bold mb-4 text-center text-white">
                  Welcome to the Trainer's Hub
                </h1>
                <p className="text-lg text-left mb-6 text-white">
                  Are you ready to dive into the vibrant world of Pokémon and
                  embark on a journey of exploration and customization? Look no
                  further, for our website is designed to cater to your every
                  Trainer need.
                </p>
                <div className="w-full flex flex-col items-start mb-1 text-white">
                  <p className="text-xl mb-2">
                    Gotta Catch 'Em All, Generation by Generation:
                  </p>
                  <p className="text-lg text-left mb-6">
                    Unleash your inner Pokémon Master by selecting your
                    preferred generation from the dropdown menu below. From the
                    classic Kanto Region to the awe-inspiring Galar Region, you
                    can view and learn about Pokémon from every era. Immerse
                    yourself in the nostalgia of the past or discover the newest
                    additions to the Pokédex.
                  </p>
                  <p className="text-xl mb-2">Forge Your Dream Team:</p>
                  <p className="text-lg text-left mb-6">
                    The true essence of being a Pokémon Trainer lies in crafting
                    your very own team of champions. Harness your creativity and
                    assemble a squad of six Pokémon that reflects your style,
                    strategy, and spirit. Channel your inner Professor Oak and
                    curate a team that's ready to conquer any challenge!
                  </p>
                  <p className="text-xl mb-2">
                    Mix and Match, Swap and Strategize:
                  </p>
                  <p className="text-lg text-left mb-6">
                    But wait, the journey doesn't end at just six Pokémon! Our
                    Trainer's Hub is built for flexibility. You have the power
                    to replace any Pokémon in your party or swap out the entire
                    team. Whether you're refining your tactics for upcoming
                    battles or seeking a fresh adventure, the choice is yours.
                    Remember, a true Trainer is always evolving!
                  </p>
                  <p className="text-xl mb-2">
                    No Login Required - Your Adventure, Your Way:
                  </p>
                  <p className="text-lg text-left mb-6">
                    No need to create yet another account - our website
                    seamlessly interacts with your browser, recognizing you as
                    the unique Trainer you are. Your Pokémon party is saved
                    locally, ensuring your journey continues where you left off.
                    Once you close the browser, fear not! Your party will be
                    waiting for you when you return, ready to embark on new
                    quests.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between w-full my-5">
            <GenerationDropdown handleSelectGeneration={getPokemons} />
            <Button
              onClick={() => setPartyDrawerOpen(true)}
              className="block w-full my-5 sm:m-0 sm:w-auto sm:inline-block"
            >
              View party
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-5 my-10">
            {pokemons?.map((pokemon: IPokemonsByGeneration) => (
              <div
                key={pokemon.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 xxl:w-1/6"
              >
                <PokemonCard
                  pokemon={pokemon}
                  handleDetailsClick={handleDetailsClick}
                  setAlertData={setAlertData}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <PokemonDetails
        pokemonId={selectedPokemon}
        open={detailsOpen}
        setOpen={setDetailsOpen}
        setAlertData={setAlertData}
      />
      <PartyDrawer open={partyDrawerOpen} setOpen={setPartyDrawerOpen} />
    </>
  );
}

export default App;
