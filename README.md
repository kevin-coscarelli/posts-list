# Posts list
You can find the app deployed at [https://kevin-coscarelli.github.io/posts-list/](https://kevin-coscarelli.github.io/posts-list/)

To run locally:
1. Clone repo:
``` sh
git clone git@github.com:kevin-coscarelli/posts-list.git
```
2. Install dependencies:
``` sh
cd posts-list
pnpm install
```
3. Run dev server:
``` sh
pnpm run dev
```
4. Have fun

## Potential improvements
- Make all styles Tailwind consistent. A styles remain vanilla CSS.
- Centralize edit toggle behavior so one can edit one at a time. Makes for better UX.
- I went for a dialog UI to enable post addition. It breaks the design a bit.
- Learned Vue in one day and made a few rushed decisions, props are a bit messy and I sort of created a custom store inside a hook. Not sure it's legal or an antipattern.
- If I added fetch error handling, I should probably add a retch retry strategy as well.
- Search clearing behavior should be changed to be more intuitive. Right now you have to clear the search bar and search again to clear the state. Also, searching on pressing Enter wouldn't hurt.
- New posts are added to the bottom of the list, it's easy to miss them. Probably should add them to the top.
- I would also add an expand/collapse feature to the posts so you cna actually see the whole text of the post.

## Missing features
- Didn't get to include sorting behavior. Should be fairly trivial to add it, similar to the search. I would include a select with all the result fields I'm using for the `sortBy` query parameter: `title`, `body`, `id`, `views` and a toggling button to switch between `asc` and `desc` for the `order` query parameter. Upon any change it would clear the posts list and pagination just like the search function does and would fetch with the corresponding parameters. The set parameters would be kept upon scroll fetch as well and results will be paginated too.
- I could easily add the tags into the posts as well in the form of a badge but didn't want to overload the post card.