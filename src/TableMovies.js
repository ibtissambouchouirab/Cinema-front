import React , {Component } from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory, { PaginationProvider,
                            PaginationTotalStandalone, 
                            PaginationListStandalone } from 'react-bootstrap-table2-paginator';
                            
import { Container, Button } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const { SearchBar, ClearSearchButton } = Search;

class TableMovies extends Component{

    state = {
        isError: Boolean,
        contacts: [ ],
    }

    constructor(props){
        super(props);
        fetch('http://localhost:8080/movies')
        .then((res) => { 
           return res.json().then((data) => { this.setState ({isError:false}); this.setState({contacts:data});})
        })
        .catch((error) => {
           console.log("CATCH");
           this.setState ({isError:true});
        })
    }

    deleteOne (row){
        console.log("delete row : "+row)
        fetch('http://localhost:8080/movies/'+row, 
        {
            method: "DELETE",
        }).catch(console.log)
     }
  

    renderTableData() {

        const options = {
            custom: true,
            totalSize: this.state.contacts.length
        };

        const deltetButton = (row) =>
       {
          return (
              
              <div>
                  <Button onClick={()=> this.deleteOne(row)}>Delete Movie</Button>                   
              </div>
            )
       };

        const columns =
        [
            {
                dataField: "id",
                text: "Id",
                sort: true
            },
            {
                dataField: "name",
                text: "Name",
                sort: true
            },
            {
                dataField: "opening",
                text: "Opening",
                sort: true
            },
            {
                dataField: "rating",
                text: "Rating",
                sort: true
            },
            {
                dataField: "genre",
                text: "Genre",
                sort: true
            },
            {
                dataField: "action",
                text: "Action", 
                formatter:deltetButton
            }
        ];

        


        return (

            <PaginationProvider pagination={ paginationFactory(options) }>
          {({ paginationProps, paginationTableProps}) => 
       (   
       <div>
            <center><h1>Movies</h1></center>
            
            <ToolkitProvider keyField="id" data={ this.state.contacts.name } columns={ columns } search>
            {
               props => (
                  <div>
                        <Container className="App">
                            <SearchBar style={{ width : 700}} placeholder="Search By Name Or Genre Or Rating"{ ...props.searchProps } />  
                            <ClearSearchButton  { ...props.searchProps } />
                        </Container>  
                       <BootstrapTable bootstrap4 { ...paginationTableProps } { ...props.baseProps } keyField="id"  data={this.state.contacts}  columns={columns} deleteRoW striped hover condensed  noDataIndication="Table is Empty"  />   
                 </div>
               )
            }
            </ToolkitProvider>
            
            <PaginationTotalStandalone { ...paginationProps }/>
            <PaginationListStandalone  { ...paginationProps }/>
      </div>
         )
      }
    </PaginationProvider>
        )
    }

    render () {
        let body; 
        if(this.state.isError){
           console.log("render KO");
           body = this.renderError();
        }else {
           console.log("render OK");
           body = this.renderTableData();
        }
  
        return (
           <div>
                {body}     
           </div>
        )
    }

    renderError() {
        return (<p>ERROR ya ERROR</p>)
    }

}
export default TableMovies