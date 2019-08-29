// import React from 'react';
//
// import AuthUserContext from './context';
// import { withFirebase } from '../Firebase';
//
// const withEmailVerification = Component => {
//   class WithEmailVerification extends React.Component {
//     constructor(props) {
//       super(props);
//
//       this.state = { isSent: false };
//     }
//
//     onSendEmailVerification = () => {
//       this.props.firebase
//         .doSendEmailVerification()
//         .then(this.setState({ isSent: true }));
//     }
//
//     render() {
//       return (
//         <AuthUserContext.Consumer>
//           {authUser =>
//             needsEmailVerification(authUser) ? (
//               <div>
//                 {
//                   this.state.isSent ? (
//                     <p>
//                       Email confirmation sent: check your email and spam folder for a confirmation email. Refresh this page once you have confirmed.
//                     </p>
//                   ) : (
//                     <p>
//                       Verify your email: check your email (and spam folder) for a confirmation email or send another.
//                     </p>
//                   )
//                 }
//                 <button
//                   type='button'
//                   onClick={this.onSendEmailVerification}
//                   disabled={this.state.isSent}>
//                   Send Confirmation Email
//                 </button>
//               </div>
//             ) : (
//               <Component {...this.props} />
//             )
//           }
//         </AuthUserContext.Consumer>
//       );
//     }
//   }
//
//   return withFirebase(WithEmailVerification);
// };
//
// const needsEmailVerification = authUser =>
//   authUser &&
//   !authUser.emailVerified &&
//   authUser.providerData &&
//   authUser.providerData.map(provider => provider.providerId).includes('password');
//
//
// export default withEmailVerification;
