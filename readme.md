# XMarket

## Mono Repo

Project is based on bun run time. Please [install bun](https://bun.sh/docs/installation) before doing anything else 
For an ad'hoc branch management, please read [this Git workflow](https://dark-crop-17c.notion.site/Git-workflow-5985a8f57e814c33b956c30450da02c8?pvs=4)

then
`bun install`

## Project Structure


### apps/web
 To start the dev environment within the folder:
 `bun run dev`
 
 To regenerate types from database:
 `bun run database:types`

 To run local database (require docker): 
 `bun run database:start`
 The following command should start the database docker stack and load ./web/supabase/schema.sql and ./web/supabase/seed.sql, so the db should be ready to use

  #### components
  Contains functional components. Please keep it organized, for a better structure across the folder use atomic design structure like 
  - **01_atoms**
  contains non breakable dumbs components (such as PageTitle, SubTitle, Paragraph ...)
  - **02_molecules**
  contains dumbs components composed from multiple atoms (such as Card, ListItemRenderer,...)
  - **03_organisms**
  contains components with method and advanced state management composed from multiple molecules (such as Carousel, Forms with validation,...)
  - **04_biomes**
  contains page layout composed from multiple atoms, molecules and organisms, 

  #### interfaces
  Contains type definition and typescript interfaces.

  #### services
  Contains function that perform remote call to apis.

  #### store
  Contains global state management functions, in our case Recoil atoms and selectors.


### packages

### contracts


####


  {/*
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const authorCollections = await explorer.getCollections({author:params.author});
          const authorCollectionNames = authorCollections.map((collection) => collection.collection_name);
          const authorTemplates = await explorer.getTemplates({collection_whitelist:authorCollectionNames.join(',')})
          setTemplates(templates);
        } catch (error) {
          console.error('Error fetching template details:', error);
        }
      };

      fetchData();
    }, [params]);

  */}