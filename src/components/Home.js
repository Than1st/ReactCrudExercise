import {useEffect, useState} from "react";
import axios from "axios";
import {MdEdit} from "react-icons/md";
import {AiFillEdit} from "react-icons/ai";
import {Link} from "react-router-dom";
import {BiTrash} from "react-icons/bi";
import Swal from "sweetalert2";

export const Home = () => {
    const [items, setItems] = useState([])
    const getItems = () => {
        axios({
            method: "GET",
            url: "http://localhost:3001/items"
        }).then((res) => {
            setItems(res.data)
        }).catch((e) => {
            console.log(e.message)
        })
    }
    const deleteHandler = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await axios({
                        method: "DELETE",
                        url: `http://localhost:3001/items/delete/${id}`,
                    });
                    getItems();
                    Swal.fire("Deleted!", "Your Items has been deleted.", "success");
                }
            });
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getItems()
    }, []);
    return (
        <div className="container-fluid">
            <h1>Home</h1>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <td>No.</td>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Stock</td>
                    <td>Category</td>
                    <td>Image</td>
                    <td>Action</td>
                </tr>
                </thead>
                <tbody>
                {
                    items.map((value, index, array) => {
                        return (
                            <tr key={value.id}>
                                <td>{index + 1}</td>
                                <td>{value.name}</td>
                                <td>{value.price}</td>
                                <td>{value.stock}</td>
                                <td>{value.category}</td>
                                <td>
                                    <img src={value.image} width='50' height='50'/>
                                </td>
                                <td>
                                    <Link to={`/editItems/${value.id}`}>
                                        <button className='btn btn-warning text-white mb-1 w-100'>
                                            <div className='row'>
                                                <div className='col-sm-3'><AiFillEdit/></div>
                                                <div className='col-sm-8'>Edit</div>
                                            </div>
                                        </button>
                                    </Link><br/>
                                    <button onClick={()=>deleteHandler(value.id)} className='btn btn-danger text-white w-100'>
                                        <div className='row'>
                                            <div className='col-sm-3'><BiTrash/></div>
                                            <div className='col-sm-8'>Hapus</div>
                                        </div>
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
