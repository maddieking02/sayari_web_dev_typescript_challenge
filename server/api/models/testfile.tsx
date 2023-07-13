// -- TEST 1
// from(db.query(postQuery, [post_id])).pipe(
//   switchMap((res: QueryResult) => {
//     if (res.rows[0].answers && res.rows[0].answers.length > 0) {
//       const updatedAnswers = res.rows[0].answers.map(answer => {
//         return from(db.query(`SELECT * FROM comments WHERE parent_answer_id=${answer.answer_id}`)).pipe(
//           concatMap((res: QueryResult) => {
//             answer.comments = res.rows;
//             return answer;
//           })
//         );
//       });
//       return forkJoin(updatedAnswers).pipe(
//         map((updatedAnswers: QueryResult) => {
//           res.rows[0].answers = updatedAnswers || [];
//           const updatedAnswersWithComments = res.rows[0].answers.map(answer => {
//             const updatedComments = answer.comments?.map(comment => {
//               return from(db.query(`SELECT name FROM users WHERE user_id = ${comment.user_id}`)).pipe(
//                 map((res: QueryResult) => {
//                   comment.user_name = res.rows[0].name;
//                   return comment;
//                 })
//               );
//             });
//             return forkJoin(updatedComments).pipe(
//               map((updatedComments: QueryResult) => {
//                 answer.comments = updatedComments || null;
//                 return answer;
//               })
//             );
//           });
//           return forkJoin(updatedAnswersWithComments).pipe(
//             map((finalAnswer: QueryResult) => {
//               res.rows[0].answers = finalAnswer;
//               return res.rows[0];
//             })
//           );
//         })
//       );
//     } else {
//       console.log('this is inner res.rows', res.rows[0])
//       return from([res.rows[0]]);
//     }
//   })
// ).subscribe({
//   next: (res) => {
//     console.log('this is res: ', res)
//     callback(null, res);
//   },
//   error: (err: QueryResultError) => {
//     callback(err);
//   }
// });

// -- TEST 2
// from(db.query(postQuery, [post_id])).pipe(
//   switchMap((res: QueryResult) => {
//     if (res.rows[0].answers && res.rows[0].answers.length > 0) {
//       return forkJoin(
//         res.rows[0]?.answers.map(answer =>
//           from(db.query(`SELECT * FROM comments WHERE parent_answer_id=${answer.answer_id}`)).pipe(
//             map((res: QueryResult) => {
//               answer.comments = res.rows;
//               return answer;
//             })
//           )
//         )
//       ).pipe(
//         switchMap((updatedAnswers: QueryResult) =>
//           forkJoin(
//             updatedAnswers.map(answer =>
//               forkJoin(
//                 answer.comments?.map(comment =>
//                   from(db.query(`SELECT name FROM users WHERE user_id = ${comment.user_id}`)).pipe(
//                     map((res: QueryResult) => {
//                       comment.user_name = res.rows[0].name;
//                       return comment;
//                     })
//                   )
//                 ) || []
//               ).pipe(
//                 map((updatedComments: QueryResult) => {
//                   answer.comments = updatedComments || null;
//                   return answer;
//                 })
//               )
//             )
//           )
//         ),
//         map(updatedAnswersWithComments => {
//           res.rows[0].answers = updatedAnswersWithComments;
//           return res.rows[0];
//         })
//       );
//     } else {
//       return from([res.rows[0]]);
//     }
//   })
// ).subscribe({
//   next: (res) => {
//     callback(null, res);
//   },
//   error: (err: QueryResultError) => {
//     callback(err);
//   }
// });