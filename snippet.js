 // const openAccount = async(e) => {
  //   setState({
  //             ...state, 
  //             child: e.currentTarget.id,
  //             modal: true,
  //             feesOption: e.currentTarget.value
  //   })
  //   setPayments({...payments, 
  //               studentID: props[e.currentTarget.id].student_id, 
  //               gradeLevel: props[e.currentTarget.id].grade_level,
  //             })
  //   // console.log(props[child].tuition_fee)
  // }
  
  // const handleInputPayment = (e) => {
  //   setPayments({...payments, [e.target.name]: e.target.value})
  // }

  // // console.log(payments.tuitionFee, 'payments state after reload calculateFee')
  // const handleTuition = (e) => {
  //   let tuitions = []
  //   tuitions.push(e.target.value)
  //   setPayments({...payments, tuitionFee: tuitions})
  // }
  

  // const calculateFee = (e) => {
  //   const totalPay = e.target.value
    
  //   const { entranceFee, miscFee, aralinksPay, booksPay, tuitionFee } = payments // this is the state of the front end to pass on backend
  //   const { entrance_fee, misc_fee, aralinks, books, tuition_fee } = props[state.child] //this is from the backend
  //   parseInt(aralinksPay, booksPay, entranceFee, miscFee, tuitionFee, totalPay)
    
  //   if(state.feesOption == "fees"){
  //     if(totalPay == parseInt(totalPay,10) && totalPay != 0){ //checks if value of input is an integer
  //       if(entrance_fee < totalPay){ //totalPay: 10000 -  entrance: 5000
  //         let change = totalPay - entrance_fee //change : 5000
  //         if(misc_fee < change) { //change: 5000  - miscfee: 2000
  //             setPayments({
  //               ...payments, 
  //               entranceFee: entrance_fee,
  //               miscFee: misc_fee,
  //               payAmount: parseInt(totalPay, 10)
  //           })
  //           change = change - misc_fee change: 3000

  //           if(aralinks < change) {
  //             setPayments({
  //               ...payments,
  //               entranceFee: entrance_fee,
  //               miscFee: misc_fee,
  //               aralinksPay: aralinks,
  //               payAmount: parseInt(totalPay, 10)
  //             })
  //             change = change - aralinks
  //               if(books < change){
  //                 let tuitions = []
  //                 change = change - books
                  
  //                 for(let i = 0; tuition_fee.length > i; i++){
  //                   if(tuition_fee[i] == 0){
  //                     tuitions.push(0)
  //                     setPayments({
  //                       ...payments, 
  //                       entranceFee: entrance_fee,
  //                       miscFee: misc_fee,
  //                       aralinksPay: aralinks,
  //                       booksPay: books,
  //                       tuitionFee: tuitions,
  //                       payAmount: parseInt(totalPay, 10)
  //                     })
  //                   }
  //                   else if(tuition_fee[i] < change){ 
  //                     tuitions.push(tuition_fee[i])  
  //                     change = change - tuition_fee[i]
  //                     setPayments({
  //                       ...payments, 
  //                       tuitionFee: tuitions,
  //                       entranceFee: entrance_fee,
  //                       miscFee: misc_fee,
  //                       aralinksPay: aralinks,
  //                       booksPay: books,
  //                       payAmount: parseInt(totalPay, 10)
  //                     })
  //                   }
  //                   else if(tuition_fee[i] > change){
  //                     tuitions.push(change)
  //                     setPayments({...payments, 
  //                       tuitionFee: tuitions,
  //                       entranceFee: entrance_fee,
  //                       miscFee: misc_fee,
  //                       aralinksPay: aralinks,
  //                       booksPay: books,
  //                       payAmount: parseInt(totalPay, 10)
  //                     })
  //                     break
  //                   }
  //                   else if(tuition_fee[i] == change){
  //                     tuitions.push(tuition_fee[i])
  //                     setPayments({
  //                       ...payments, 
  //                       tuitionFee: tuitions,
  //                       entranceFee: entrance_fee,
  //                       miscFee: misc_fee,
  //                       aralinksPay: aralinks,
  //                       booksPay: books,
  //                       payAmount: parseInt(totalPay, 10)
  //                     })
  //                     break
  //                   }
  //                 }
  //               }
                
  //               else if(books > change){
  //                 setPayments({
  //                   ...payments,
  //                   entranceFee: entrance_fee,
  //                   miscFee: misc_fee,
  //                   aralinksPay: aralinks,
  //                   booksPay: change,
  //                   payAmount: parseInt(totalPay, 10)
  //                 })
  //               }
  //                 else if(books === change){
  //                   setPayments({
  //                     ...payments,
  //                     entranceFee: entrance_fee,
  //                     miscFee: misc_fee,
  //                     aralinksPay: aralinks,
  //                     booksPay: books,
  //                     payAmount: parseInt(totalPay, 10)
  //                   })
  //                 }
  //             }

  //           else if(aralinks > change){
  //             setPayments({
  //               ...payments,
  //               entranceFee: entrance_fee,
  //               miscFee: misc_fee,
  //               aralinksPay: change,
  //               payAmount: parseInt(totalPay, 10)
  //             })
  //           }
  //           else if(aralinks === change){
  //             setPayments({
  //               ...payments,
  //               entranceFee: entrance_fee,
  //               miscFee: misc_fee,
  //               aralinksPay: aralinks,
  //               payAmount: parseInt(totalPay, 10)
  //             })
  //           }
  //         }
  //         else if(misc_fee > change)
  //         {
  //           setPayments({
  //             ...payments, 
  //             entranceFee: entrance_fee,
  //             miscFee: change,
  //             payAmount: parseInt(totalPay, 10)
  //           })
  //         }

  //         else if(change === misc_fee){
  //           setPayments({
  //             ...payments, 
  //             entranceFee: entrance_fee,
  //             miscFee: misc_fee,
  //             payAmount: parseInt(totalPay, 10)
  //           })
  //         }
  //       }
  //       else{
  //         setPayments({
  //           ...payments, 
  //           entranceFee: parseInt(totalPay, 10), 
  //           miscFee: '',
  //           aralinksPay: '', 
  //           booksPay: '',
  //           tuitionFee: [ '', '', '', '', '', '', '', '', '', ''],
  //           payAmount: parseInt(totalPay, 10)
  //         })
  //       }
  //     }
  //   }
  //   else if(state.feesOption == "tuition"){
  //     let change = totalPay
  //     let tuitions = []
  //     for(let i = 0; tuition_fee.length > i; i++){
  //       if(tuition_fee[i] == 0){
  //         tuitions.push(0)
  //         setPayments({
  //           ...payments, 
  //           tuitionFee: tuitions,
  //           entranceFee: 0,
  //           miscFee: 0,
  //           aralinksPay: 0,
  //           booksPay: 0,
  //           payAmount: parseInt(totalPay, 10)
  //         })
  //       }
  //       else if(tuition_fee[i] < change){ 
  //         tuitions.push(tuition_fee[i])  
  //         change = change - tuition_fee[i]
  //         setPayments({
  //           ...payments, 
  //           tuitionFee: tuitions,
  //           entranceFee: 0,
  //           miscFee: 0,
  //           aralinksPay: 0,
  //           booksPay: 0,
  //           payAmount: parseInt(totalPay, 10)
  //         })
  //       }
  //       else if(tuition_fee[i] > change){
  //         tuitions.push(change)
  //         setPayments({...payments, 
  //           tuitionFee: tuitions,
  //           entranceFee: 0,
  //           miscFee: 0,
  //           aralinksPay: 0,
  //           booksPay: 0,
  //           payAmount: parseInt(totalPay, 10)
  //         })
  //         break
  //       }
  //       else if(tuition_fee[i] == change){
  //         tuitions.push(tuition_fee[i])
  //         setPayments({
  //           ...payments, 
  //           tuitionFee: tuitions,
  //           entranceFee: 0,
  //           miscFee: 0,
  //           aralinksPay: 0,
  //           booksPay: 0,
  //           payAmount: parseInt(totalPay, 10)
  //         })
  //         break
  //       }
  //     }
  //   }
      
  //   console.log(payments, 'payments state inside calculateFee')
  // }

  // const clearFees = () => {
  //   setPayments({ ...payments,
  //     studentID: '',
  //     gradeLevel: '',   
  //     entranceFee: '',
  //     miscFee: '',
  //     aralinksPay: '',
  //     booksPay: '',
  //     tuitionFee: ['', '', '', '', '', '', '', '', '', ''],
  //     payAmount: '',
  //   })
  // }

  // console.log(payments, 'payments state inside calculateFee')

  // const payFees = async(e) => {
  //   let {
  //     studentID, 
  //     gradeLevel, 
  //     entranceFee, 
  //     miscFee, 
  //     aralinksPay, 
  //     booksPay, 
  //     tuitionFee, 
  //     payAmount
  //   } = payments
  //   parseInt((entranceFee, miscFee, aralinksPay, booksPay, payAmount), 10)
  //   //console.log(entranceFee, miscFee, aralinksPay, booksPay, payAmount, "parse Int payfees")
  //   payAmount = entranceFee + miscFee + aralinksPay + booksPay
  //   //console.log(payAmount, "pay amount in pay fees")
  
  //   if(payAmount != 0){
  //     try{
  //       fetch('http://localhost:5000/account/payStudentAccount',  {
  //       method: 'POST',
  //       headers: { 
  //           'Content-Type': 'application/json', 
  //           'token': userToken
  //         },
  //       body: 
  //         JSON.stringify({
  //           "studentID": studentID,
  //           "gradeLevel": gradeLevel,
  //           "entranceFee": entranceFee,
  //           "miscFee": miscFee,
  //           "aralinksPay": aralinksPay,
  //           "booksPay": booksPay,
  //           "tuitionFee": tuitionFee,
  //           "payAmount": payAmount
  //         })
  //      }).then((res) => res.json())
  //        .then((data) => {
  //         console.log(data)
  //         setState({
  //           ...state,
  //           modal : false,
  //           child : 0,
  //         })
  //         setPayments({
  //           ...payments,
  //           entranceFee: '',
  //           miscFee: '', 
  //           aralinksPay: '',
  //           booksPay: '',
  //           tuitionFee: ['', '', '', '', '', '', '', '', '', ''],
  //           payAmount: ''
  //         })
  //       })
  //     }
  //     catch(error){
  //       return error
  //     }
  //   }
  //   else if(payAmount == 0 || payAmount != parseInt(payAmount, 10)){
  //     console.log("Invalid syntax")
  //   }
  // }

  //  const paymentModal = (
  //   <Container className={classes.modal}>
  //     <div className={classes.studentContainer}>
  //       <Typography><span>{props.length == 0 ? null : props[state.child].student_name}</span></Typography>
  //     </div>
  //     <div className={classes.feesContainer}>
  //       <div>
  //       <FormControl>
  //         <Typography>Entrance Fee</Typography>
  //         <TextField 
  //           name="entranceFee" 
  //           variant="outlined"
  //           label={props.length == 0 ? null : props[state.child].entrance_fee.toString()}
  //           size="small"
  //           className={classes.modalInput}
  //           value={payments.entranceFee} 
  //           onChange={handleInputPayment}
  //           disabled={state.disabled}
  //         />
  //       </FormControl>
  //       <FormControl>
  //         <Typography>Misc Fee</Typography>
  //         <TextField 
  //           name="miscFee" 
  //           variant="outlined"
  //           label={props.length == 0 ? null : props[state.child].misc_fee.toString()}
  //           size="small"
  //           className={classes.modalInput}
  //           value={payments.miscFee} 
  //           onChange={handleInputPayment} 
  //           disabled={state.disabled}
  //         />
  //       </FormControl>
  //       <FormControl>
  //         <Typography>Aralinks</Typography>
  //         <TextField 
  //           name="aralinksPay"
  //           variant="outlined" 
  //           label={props.length == 0 ? null : props[state.child].aralinks.toString()}
  //           className={classes.modalInput}
  //           size="small"
  //           value={payments.aralinksPay} 
  //           onChange={handleInputPayment} 
  //           disabled={state.disabled}
  //         />
  //       </FormControl>
  //       <FormControl>
  //         <Typography>Books</Typography>
  //         <TextField 
  //           name="booksPay"
  //           variant="outlined"
  //           label={props.length == 0 ? null : props[state.child].books.toString()}
  //           className={classes.modalInput} 
  //           size="small"
  //           value={payments.booksPay} 
  //           onChange={handleInputPayment} 
  //           disabled={state.disabled}
  //         />
  //       </FormControl>
  //       </div>
  //       <div className={classes.tuitionContainer}>
  //         <div>
  //           <FormControl>
  //             <Typography>August</Typography>
  //               <TextField 
  //                 name="tuitionFee[0]"
  //                 label={props.length == 0 ? null : props[state.child].tuition_fee[0].toString()}
  //                 variant="outlined"
  //                 className={classes.modalInput}  
  //                 size="small"
  //                 // value={payments.tuitionFee[0]} 
  //                 onChange={handleTuition}
  //                 disabled
  //               />
  //             </FormControl>
  //             <FormControl>
  //               <Typography>September</Typography>
  //               <TextField 
  //                 name="tuitionFee[1]"
  //                 label={props.length == 0 ? null : props[state.child].tuition_fee[1].toString()}
  //                 variant="outlined"
  //                 className={classes.modalInput}  
  //                 size="small"
  //                 value={payments.tuitionFee[1]} 
  //                 onChange={handleTuition} 
  //                 disabled
  //               />
  //             </FormControl>
  //             <FormControl>
  //               <Typography>October</Typography>
  //               <TextField 
  //                 name="tuitionFee[2]"
  //                 label={props.length == 0 ? null : props[state.child].tuition_fee[2].toString()}
  //                 variant="outlined"
  //                 className={classes.modalInput} 
  //                 size="small"
  //                 value={payments.tuitionFee[2]} 
  //                 onChange={handleInputPayment} 
  //                 disabled
  //               />
  //             </FormControl>
  //             <FormControl>
  //               <Typography>November</Typography>
  //               <TextField 
  //                 name="tuitionFee[3]"
  //                 label={props.length == 0 ? null : props[state.child].tuition_fee[3].toString()}
  //                 variant="outlined" 
  //                 className={classes.modalInput} 
  //                 size="small"
  //                 value={payments.tuitionFee[3]} 
  //                 onChange={handleInputPayment} 
  //                 disabled
  //               />
  //             </FormControl>
  //             <FormControl>
  //               <Typography>December</Typography>
  //               <TextField 
  //                 name="tuitionFee[4]"
  //                 label={props.length == 0 ? null : props[state.child].tuition_fee[4].toString()}
  //                 variant="outlined" 
  //                 className={classes.modalInput} 
  //                 size="small"
  //                 value={payments.tuitionFee[4]} 
  //                 onChange={handleInputPayment} 
  //                 disabled
  //               />
  //             </FormControl>
  //           </div>
  //         <div>
  //           <FormControl>
  //             <Typography>January</Typography>
  //               <TextField 
  //                 name="tuitionFee[5]"
  //                 label={props.length == 0 ? null : props[state.child].tuition_fee[5].toString()}
  //                 variant="outlined" 
  //                 className={classes.modalInput} 
  //                 size="small"
  //                 value={payments.tuitionFee[5]} 
  //                 onChange={handleInputPayment} 
  //                 disabled
  //               />
  //           </FormControl>
  //           <FormControl>
  //             <Typography>February</Typography>
  //               <TextField 
  //                 name="tuitionFee[6]"
  //                 label={props.length == 0 ? null : props[state.child].tuition_fee[6].toString()}
  //                 variant="outlined" 
  //                 className={classes.modalInput} 
  //                 size="small"
  //                 value={payments.tuitionFee[6]} 
  //                 onChange={handleInputPayment} 
  //                 disabled
  //               />
  //           </FormControl>
  //           <FormControl>
  //             <Typography>March</Typography>
  //               <TextField 
  //                 name="tuitionFee[7]"
  //                 label={props.length == 0 ? null : props[state.child].tuition_fee[7].toString()}
  //                 variant="outlined" 
  //                 className={classes.modalInput} 
  //                 size="small"
  //                 value={payments.tuitionFee[7]} 
  //                 onChange={handleInputPayment} 
  //                 disabled
  //               />
  //           </FormControl>
  //           <FormControl>
  //             <Typography>April</Typography>
  //               <TextField 
  //                 name="tuitionFee[8]"
  //                 variant="outlined"
  //                 label={props.length == 0 ? null : props[state.child].tuition_fee[8].toString()}
  //                 className={classes.modalInput} 
  //                 size="small"
  //                 value={payments.tuitionFee[8]} 
  //                 onChange={handleInputPayment} 
  //                 disabled
  //               />
  //           </FormControl>
  //           <FormControl>
  //             <Typography>May</Typography>
  //               <TextField 
  //                 name="tuitionFee[9]"
  //                 label={props.length == 0 ? null : props[state.child].tuition_fee[9].toString()}
  //                 variant="outlined" 
  //                 className={classes.modalInput} 
  //                 size="small"
  //                 value={payments.tuitionFee[9]} 
  //                 onChange={handleInputPayment} 
  //                 disabled
  //               />
  //           </FormControl>
  //         </div>
  //         </div> 
  //       </div>
  //           <div className={classes.paymentContainer}>
  //             <div>
  //               <Typography>Balance<span>{props.length == 0 ? null : props[state.child].total_balance}</span></Typography>
  //               <TextField 
  //                 name="totalPay"
  //                 label="Pay Amount" 
  //                 variant="outlined" 
  //                 size="small"
  //                 onBlur={calculateFee}
  //               />	
  //             </div> 
  //             <Button 
  //                 className={classes.payButton} 
  //                 variant="outlined"
  //                 onClick={payFees}
  //               >
  //                 Pay {loader && <Loader size={30} color="green"/>}
  //               </Button>
  //               <Button 
  //                 className={classes.clearButton} 
  //                 variant="outlined"
  //                 onClick={clearFees}
  //               >
  //                 Clear 
  //               </Button>
  //             </div>      
	// 		</Container>
  // )
  // // This displays the row of each student account
  // const account = props.map((account, index) => {
  //   return(
  //     <Fragment>
  //       <TableRow name="account" key={index}>
  //         <TableCell value={props.length == 0 ? null : account.student_id}>
  //           <Typography>{props.length == 0 ? null : account.student_id}</Typography>
  //         </TableCell>
  //         <TableCell value={props.length == 0 ? null : account.student_name}>
  //           <Typography>{props.length == 0 ? null : account.student_name}</Typography>
  //         </TableCell>
  //         <TableCell value={props.length == 0 ? null : account.total_balance}>
  //           <Typography>{props.length == 0 ? null : account.total_balance}</Typography>
  //         </TableCell>
  //         <TableCell>
  //           <Button
  //             id={props.length == 0 ? null : index}
  //             value="fees"
  //             variant="outlined"
  //             style={{
  //               backgroundColor: 'red',
  //               color: 'white',
  //               border: 'none',
  //               width: '80px',
  //               height: '40px', 
  //               fontSize: '0.85em',
  //               margin: '0px 5px 0px 5px'
  //             }} 
  //             onClick={openAccount}
  //           >
  //             Fees
  //           </Button>
  //           <Button
  //             id={props.length == 0 ? null : index}
  //             value="tuition"
  //             variant="outlined"
  //             style={{
  //               backgroundColor: 'orange',
  //               color: 'white',
  //               border: 'none',
  //               width: '80px',
  //               height: '40px', 
  //               fontSize: '0.85em',
  //               margin: '0px 5px 0px 5px'
  //             }} 
  //             onClick={openAccount}
  //           >
  //             Tuition
  //           </Button>
  //         </TableCell>
  //       </TableRow>
  //     </Fragment>
  //   )
  // })
  