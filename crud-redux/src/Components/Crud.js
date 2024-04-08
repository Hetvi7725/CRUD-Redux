import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { addrecord, deleterecord, updateRecord } from "./Redux/Action/Crudaction";
import Form from 'react-bootstrap/Form';
import { Pagination } from 'react-bootstrap';

function Crud(){
    let productData = useSelector(state=>state.pro);
    let dispatch = useDispatch();
    let [product , setproduct]= useState({});
    let [id , setId]= useState(-1);

    let [search , setsearch] = useState('');

    // let [prorecord, setprorecord] = useState([]);
    // let [pageno, setpageno] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [PerPage , setPerPage] = useState(5);

    let [sortdata ,setsort] = useState(false);

    // useEffect(()=>{
    //     const LastRecord = currentPage * PerPage;
    //     const FirstRecord = LastRecord - PerPage;
    //     const currentRecords = productData.slice(FirstRecord, LastRecord);
    //     setproduct(currentRecords)
    //     const no = Math.ceil(productData.length / PerPage)
    //     var pages = [];
    //         for(let i=1 ; i<=no ; i++) 
    //         {
    //             pages.push(i);
    //         }
    //         setpageno(pages);
    // })

    // let selectno=(pagen)=>{
    //     setCurrentPage(pagen);
    //     const LastRecord = pagen * PerPage;
    //     const FirstRecord = LastRecord - PerPage;
    //     const currentRecords = productData.slice(FirstRecord, LastRecord);
    //     setprorecord(currentRecords);
    // }

    let sortingproduct = (sortdata) => {
        let products = [...productData];
        var productdatas;
        if (sortdata) {
            productdatas = products.sort((a, b) => a.price - b.price);
            setsort(true);
        }
        else {
            productdatas = products.sort((a, b) => b.price - a.price);
            setsort(false);
        }
        console.log(productdatas);
        setproduct(productdatas);
    }

    let Submitdata=(e)=>{
        e.preventDefault();
        if(id!=-1){
            dispatch(updateRecord(product))
        }
        else{
            product.id=Math.round(Math.random()*10000)
            dispatch(addrecord(product));
        }
        setId(-1);
        setproduct({});
      
    }
    let getinputvalue=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setproduct({...product , [name] : value})
    }

    let delete_record=(id)=>{
        dispatch(deleterecord(id));
    }

    let update_record=(id)=>{
        let pos = productData.findIndex((v,i)=>v.id==id);
        if(pos!=-1)
        {
            setproduct(productData[pos]);
            setId(id);
        }
    }

    return(
        <div>
            <h1 style={{textAlign:"center"}}>Add Product Record</h1>
            <form method="post" onSubmit={(e)=>Submitdata(e)}>
                <table border={1} align="center" width={400} height={200}>
                    <tr>
                        <td>Enter Title</td>
                        <td><input type="text" name="title" onChange={(e)=>getinputvalue(e)} value={product.title?product.title:""}/></td>
                    </tr>
                    <tr>
                        <td>Enter Price</td>
                        <td><input type="text" name="price" onChange={(e)=>getinputvalue(e)} value={product.price?product.price:""}/></td>
                    </tr>
                    <tr>
                        <td>Enter Old Price</td>
                        <td><input type="text" name="oprice" onChange={(e)=>getinputvalue(e)} value={product.oprice?product.oprice:""}/></td>
                    </tr>
                    <tr>
                        <td>Enter Description</td>
                        <td><input type="text" name="description" onChange={(e)=>getinputvalue(e)} value={product.description?product.description:""}/></td>
                    </tr>
                    <tr>
                        <td>Enter Image Link</td>
                        <td><input type="text" name="image" onChange={(e)=>getinputvalue(e)} value={product.image?product.image:""}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="submit" name="submit" value={id==-1?"Submit":"Update"}/></td>
                    </tr>
                </table>
            </form>

            <h1 style={{textAlign:"center"}}>View Product Record</h1>

            <input type="text" placeholder="Search" style={{width:"50%" , padding:"10px"}} onChange={(e)=>setsearch(e.target.value)}/><br/><br/>
            
            <Form.Select aria-label="Default select example" name="data" onChange={(e) => sortingproduct(sortdata)}>
                    <option>Sorting Data</option>
                    <option value={sortdata}>Ascending Order</option>
                    <option value={sortdata}>Descanding Order</option>
            </Form.Select>

            <div style={{display:"flex" , flexWrap:"wrap", margin:"0 50px"}}>
                {productData ? productData.filter((v1 , i1)=>{
                    if(v1.title.match(search))
                    {
                        return v1;
                    }
                    else if(v1.price.match(search))
                    {
                        return v1
                    }
                }).map((v,i)=>{
                    return(
                            <div style={{width:"300px" , height:"400px", margin:"0 20px" ,border:"2px solid"}}>
                                <img src={v.image} width={200} height={200}/>
                                <h2>{v.title}</h2>
                                <h4>{v.price} <del>{v.oprice}</del></h4>
                                <p>{v.description}</p>
                                <div>
                                    <button onClick={(e)=>delete_record(v.id)}>Delete</button>
                                        ||
                                    <button onClick={(e)=>update_record(v.id)}>Update</button>
                                </div>
                            </div>
                    )
                }) : ""}
                </div>    
                {/* <Pagination>
                    <div style={{margin:"0 auto", display:"flex" , marginTop:"30px"}}>
                        {pageno.map((v,i)=>{
                                    return(
                                             <Pagination.Item key={v} active={v} onClick={()=>selectno(v)}>{v}</Pagination.Item>
                                    )
                        })}
                    </div>
                </Pagination>                                             */}
        </div>
    )
}

export default Crud;