// Import stylesheets
import './style.css';
import TmdbApi = require('tmdb-typescript-api');
import 'material-dynamic-colors';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');
appDiv.innerHTML = `<p>Material Dynamic Colors</p>`;
appDiv.style.backgroundColor = 'white';

const containerColors: HTMLElement = document.getElementById('containerColors');
const colorCategory: HTMLElement = document.getElementById('colorCategory');
const containerBox = document.getElementsByClassName(
  'containerBox'
)[0] as HTMLElement;

const container: HTMLElement = document.getElementById('container');
const containerColor = document.getElementsByClassName(
  'colors'
)[0] as HTMLElement;

const header: HTMLElement = document.getElementById('Header');
const subheader: HTMLElement = document.getElementById('Subheader');

const URL_IMAGE = 'https://image.tmdb.org/t/p/w500';
const API_MOVIES: TmdbApi.TmdbApi = new TmdbApi.TmdbApi(
  '5f3a6c8f58f5aa4231c3724fe54e387d'
);

API_MOVIES.search.tvshows('Pokemon').subscribe((response) => {
  if (response.total_results > 0) {
    setDataMovie(response.results[1]);
  } else {
  }
});

const setDataMovie = async (data) => {
  const { title, name, overview, poster_path, backdrop_path } = data;
  setTitle(title || name);
  setDescription(overview);
  setBackgroundImage(backdrop_path || poster_path);
  setPosterImage(poster_path);

  const themeColors = await getColors(poster_path, 'light');
  setColorsToElement(themeColors);
  //setColorsView(themeColors);
  setColorsBox(themeColors);
  setColorCategory(themeColors);
};

const setTitle = (title: string) => {
  header.innerText = title;
};

const setDescription = (description: string) => {
  subheader.innerText = description;
};

const setBackgroundImage = (bgImage) => {
  document.body.style.backgroundImage = `url(${URL_IMAGE}${bgImage})`;
  document.body.style.backgroundSize = 'contain';
};

const setPosterImage = (posterImage) => {
  const imageView = document.getElementsByTagName('img')[0];
  imageView.setAttribute('src', `${URL_IMAGE}${posterImage}`);
};

const getColors = async (image: string, theme: 'dark' | 'light') => {
  const url = `${URL_IMAGE}${image}`;
  let colors = await materialDynamicColors(url);
  return colors[theme];
};

const setColorsToElement = (themeColors) => {
  const {
    primaryContainer,
    onPrimaryContainer,
    onPrimary,
    primary,
    background,
  } = themeColors;

  appDiv.style.backgroundColor = primary;
  appDiv.style.color = onPrimary;

  container.style.backgroundColor = primaryContainer;
  container.style.color = onPrimaryContainer;

  //containerColors.style.backgroundColor = primaryContainer;
  //colorCategory.style.backgroundColor = primaryContainer;
  //containerBox.style.backgroundColor = primaryContainer;

  document.body.style.backgroundColor = background;
};

const setColorsView = (themeColors) => {
  containerColors.innerHTML = '';
  Object.entries(themeColors).forEach(([key, value]) => {
    //console.log(key + ' ' + value);
    const divColor = document.createElement('div');
    divColor.innerHTML = key + '</br>' + value;
    divColor.classList.add('color', 'shadow-z-1');
    divColor.style.backgroundColor = value;

    containerColors.appendChild(divColor);
  });
};

const setColorCategory = (themeColors) => {
  const { primary, onPrimary } = themeColors;
  const { primaryContainer, onPrimaryContainer } = themeColors;

  const { secondary, onSecondary } = themeColors;
  const { secondaryContainer, onSecondaryContainer } = themeColors;

  const { tertiary, onTertiary } = themeColors;
  const { tertiaryContainer, onTertiaryContainer } = themeColors;

  const { error, onError } = themeColors;
  const { errorContainer, onErrorContainer } = themeColors;

  const { surface, onSurface } = themeColors;
  const { surfaceVariant, onSurfaceVariant } = themeColors;
  const { inverseSurface, inverseOnSurface } = themeColors;

  const { background, onBackground } = themeColors;
  const { outline, shadow } = themeColors;

  colorCategory.appendChild(getColorTile('Primary', primary, onPrimary));
  colorCategory.appendChild(getColorTile('OnPrimary', onPrimary, primary));
  colorCategory.appendChild(
    getColorTile('PrimaryContainer', primaryContainer, onPrimaryContainer)
  );
  colorCategory.appendChild(
    getColorTile('OnPrimaryContainer', onPrimaryContainer, primaryContainer)
  );

  colorCategory.appendChild(getColorTile('Secondary', secondary, onSecondary));
  colorCategory.appendChild(
    getColorTile('OnSecondary', onSecondary, secondary)
  );

  colorCategory.appendChild(
    getColorTile('SecondaryContainer', secondaryContainer, onSecondaryContainer)
  );
  colorCategory.appendChild(
    getColorTile(
      'OnSecondaryContainer',
      onSecondaryContainer,
      secondaryContainer
    )
  );

  colorCategory.appendChild(
    getColorTile('TertiaryContainer', tertiaryContainer, onTertiaryContainer)
  );
  colorCategory.appendChild(
    getColorTile('OnTertiaryContainer', onTertiaryContainer, tertiaryContainer)
  );
};

const getColorTile = (name, color1, color2) => {
  const pColor = document.createElement('p');
  pColor.innerText = name;
  pColor.style.backgroundColor = color1;
  pColor.style.color = color2;
  return pColor;
};

const getColorDiv = (color1, color2) => {
  const div = document.createElement('div');

  const divColor1 = document.createElement('div');
  const span1 = document.createElement('span');

  div.classList.add('box');

  divColor1.style.backgroundColor = color1;
  divColor1.classList.add('color1');
  divColor1.append(span1);
  span1.style.backgroundColor = color2 || color1;

  div.style.width = '60px';
  divColor1.style.borderRadius = '12px';
  div.appendChild(divColor1);

  if (color2) {
    const divColor2 = document.createElement('div');
    const span2 = document.createElement('span');

    divColor2.style.backgroundColor = color2;
    divColor2.classList.add('color2');
    divColor2.append(span2);
    span2.style.backgroundColor = color1;

    divColor1.style.borderRadius = '12px 0 0 12px';
    div.style.width = '120px';

    div.appendChild(divColor2);
  }
  return div;
};

const setColorsBox = (themeColors) => {
  const { primary, onPrimary } = themeColors;
  const { primaryContainer, onPrimaryContainer } = themeColors;

  const { secondary, onSecondary } = themeColors;
  const { secondaryContainer, onSecondaryContainer } = themeColors;

  const { tertiary, onTertiary } = themeColors;
  const { tertiaryContainer, onTertiaryContainer } = themeColors;

  const { error, onError } = themeColors;
  const { errorContainer, onErrorContainer } = themeColors;

  const { surface, onSurface } = themeColors;
  const { surfaceVariant, onSurfaceVariant } = themeColors;
  const { inverseSurface, inverseOnSurface } = themeColors;

  const { background, onBackground } = themeColors;
  const { outline, shadow } = themeColors;

  const boxPrimary = getColorDiv(primary, onPrimary);
  const boxPrimaryContainer = getColorDiv(primaryContainer, onPrimaryContainer);

  const boxSecondary = getColorDiv(secondary, onSecondary);
  const boxSecondaryContainer = getColorDiv(
    secondaryContainer,
    onSecondaryContainer
  );

  const boxTertiary = getColorDiv(tertiary, onTertiary);
  const boxTertiaryContainer = getColorDiv(
    tertiaryContainer,
    onTertiaryContainer
  );

  const boxError = getColorDiv(error, onError);
  const boxErrorContainer = getColorDiv(errorContainer, onErrorContainer);

  const boxSurface = getColorDiv(surface, onSurface);
  const boxSurfaceVariant = getColorDiv(surfaceVariant, onSurfaceVariant);

  const boxInverseSurface = getColorDiv(inverseSurface, inverseOnSurface);
  const boxBackground = getColorDiv(background, onBackground);

  const boxOutlineShadow = getColorDiv(outline, shadow);
  //const boxShadow = getColorDiv(shadow, null);

  containerBox.append(boxPrimary, boxPrimaryContainer);
  containerBox.append(boxSecondary, boxSecondaryContainer);
  containerBox.append(boxTertiary, boxTertiaryContainer);
  containerBox.append(boxError, boxErrorContainer);
  containerBox.append(boxSurface, boxSurfaceVariant);
  containerBox.append(boxInverseSurface, boxBackground);

  containerBox.append(boxOutlineShadow);
};
