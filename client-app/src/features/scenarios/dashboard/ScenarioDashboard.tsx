import { Grid, Loader } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ScenarioList from "./ScenarioList";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import ScenarioFilters from "./ScenarioFilters";
import { PagingParams } from "../../../app/models/pagination";
import ScenarioListItemPlaceholder from "./ScenarioListItemPlaceholder";
import InfiniteScroll from 'react-infinite-scroller';

export default observer(function ScenarioDashboard() {
  const { scenarioStore } = useStore();
  const { setPagingParams, pagination, loadScenarios } = scenarioStore;
  const [loadingNext, setLoadingNext] = useState(false);
  
  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadScenarios().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    loadScenarios();
  }, [loadScenarios])

  return (
    <Grid>
      <Grid.Column width='10'>
        {scenarioStore.loadingInitial && !loadingNext ? (
          <>
            <ScenarioListItemPlaceholder />
            <ScenarioListItemPlaceholder />
          </>
        ) : (
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
            initialLoad={false}
          >
            <ScenarioList />
          </InfiniteScroll>
        )}
      </Grid.Column>
      <Grid.Column width='6'>
        <ScenarioFilters />
      </Grid.Column>
      <Grid.Column width='10'>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  )
})