import { useImageContext } from '../Context/Context';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  ButtonLabel,
} from './Searchbar.styled';

export const Searchbar = () => {
  const { onSubmit, query, handleChange } = useImageContext();
  return (
    <Header>
      <SearchForm onSubmit={onSubmit}>
        <SearchFormButton type="submit" aria-label="Search">
          <ButtonLabel>&#128269;</ButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
        />
      </SearchForm>
    </Header>
  );
};
