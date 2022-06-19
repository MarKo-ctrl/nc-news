import React, { useState, useContext } from 'react';
import { UserContext } from '../context/User';

export const PostComment = () => {
    const { user } = useContext(UserContext);

    return (<>
        <main>
            <form>
                {Object.keys(user).length !== 0 ? <fieldset >
                    <legend>Disabled fieldset example</legend>
                    <div className="mb-3">
                        <label htmlFor="disabledTextInput" className="form-label">Disabled input</label>
                        <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </fieldset> :
                    <fieldset disabled>
                        <legend>Disabled fieldset example</legend>
                        <div className="mb-3">
                            <label htmlFor="disabledTextInput" className="form-label">Disabled input</label>
                            <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </fieldset>}
            </form>
        </main>
    </>
    )
}
