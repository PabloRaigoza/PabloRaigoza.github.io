#include <SDL2/SDL.h>

// <SDL.h> For windows

using namespace std;

int main( int args, char *argc[] )
{
	//Dimensions of screen
	const int WIDTH = 640;
	const int HEIGHT = 480;

	//Load SDL into ram
	SDL_Init( SDL_INIT_VIDEO );

	//Create our window
	SDL_Window *myWindow = SDL_CreateWindow( "Hello World!",
   	                                          SDL_WINDOWPOS_UNDEFINED,
   	                                          SDL_WINDOWPOS_UNDEFINED, 
   	                                          WIDTH,
   	                                          HEIGHT,
   	                                          SDL_WINDOW_SHOWN );
	SDL_Delay( 1000 );//Delay one sec

	//Free resources. VERY IMPORTANT
	SDL_DestroyWindow( myWindow );
	myWindow = NULL;

	SDL_Quit();

	return 0;
}
