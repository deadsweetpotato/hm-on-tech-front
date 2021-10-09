import { useState, useEffect } from 'react';
import { Box, Button, Grid } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { LOAD_AUTHOR_POSTS_REQUEST, LOAD_POSTS_REQUEST, REMOVE_POSTS_REQUEST } from '../reducers/posts';
import Router from 'next/router';
import { toast } from 'react-toastify';
import router from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const ArticleList = () => {
  const [row, setRow] = useState([]);

  const dispatch = useDispatch();

  const { userId } = useSelector(state => state.user)
  const { mainPosts } = useSelector(state => state.posts)

  const [selectionModel, setSelectionModel] = useState([]);

  useEffect( async () => {
    dispatch({
      type: LOAD_AUTHOR_POSTS_REQUEST,
      data: userId
    })
    setRow(mainPosts);
  },[])

  useEffect(() => {
    setRow(mainPosts);
  }, [mainPosts])
  console.log(row)
  const deleteArticle = () => {
    if (selectionModel.length === 0){
      toast.warning('please select article to delete')
      return;
    }
    dispatch({
      type: REMOVE_POSTS_REQUEST,
      data: selectionModel
    })
  }
  
  const editArticle = (length) => {
    if (length === 0){
      toast.warning('please select article to edit')
    }
    if (length > 1){
      toast.warning('please select one article at a time')
    }
    if (length === 1){
      Router.push(`/admin/edit/${selectionModel[0]}`)
    }
  }


  const columns = [
    { field: 'author', flex:1 },
    { field: 'title', flex:2 },
    { field: 'volume', flex:1 },
    { field: 'issue', flex:1 },
    { field: 'link', flex:1,
      renderCell: (params) => (
        <>
          <Link href={`${params.value}`}>
            <Button>link</Button>
          </Link>
        </>
      ),
    },
    { field: 'createdAt', flex:1 ,
      valueFormatter: (params) => {
        return `${params.value.split('T')[0]}`;
      },
    },
    { field: 'viewCount', flex:1},
  ]
  
  const columnsForMobile = [
    { field: 'title', flex:2 },
  ]

  const makeArticleLink = (rows) => rows.map((row) => {
    return {
      ...row,
      link: `/article/${row.id}`
    }
  });
  console.log(makeArticleLink(row))
  return (
    <>
      <Button onClick={() => router.push('/admin/new')}> New </Button>
      <Button onClick={() => editArticle(selectionModel.length)}> Edit </Button>
      <Button onClick={deleteArticle}> Delete </Button>
      <Box
        component={Grid}
        item
        xs={12}
        display={{ xs: "none", sm: "none",md:"block", lg: "block" }}
      >
        <div style={{ height: 1000, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={makeArticleLink(row)}
            checkboxSelection={true}
            onSelectionModelChange={(model) => {
              setSelectionModel(model.selectionModel);
            }}
          />
        </div>
      </Box>
      <Box
        component={Grid}
        item
        xs={12}
        display={{ xs: "block", sm: "block",md:"none", lg: "none" }}
      >
        <div style={{ height: 1000, width: '100%' }}>
          <DataGrid
            columns={columnsForMobile}
            rows={row}
            checkboxSelection={true}
            onSelectionModelChange={(model) => {
              setSelectionModel(model.selectionModel);
            }}
          />
        </div>
      </Box>
    </>
  )
}

export default ArticleList;
