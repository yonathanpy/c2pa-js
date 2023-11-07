// Copyright 2021 Adobe
// All Rights Reserved.
//
// NOTICE: Adobe permits you to use, modify, and distribute this file in
// accordance with the terms of the Adobe license agreement accompanying
// it.
use crate::error::{Error, Result};
use c2pa::{
    claim::Claim, status_tracker::DetailedStatusTracker, store::Store, validator::ValidationInfo,
};
use serde::Serialize;

#[derive(Serialize)]
pub struct ClaimInfo {
    claim: Claim,
    size: usize,
    signature_info: Option<ValidationInfo>,
    signature_size: usize,
    uri: String,
}

#[derive(Serialize)]
pub struct DetailedInfo {
    claims: Vec<ClaimInfo>,
    active_manifest: Option<String>,
}

pub async fn get_detailed_info(data: &[u8], format: &str) -> Result<DetailedInfo> {
    let mut validation_log = DetailedStatusTracker::new();

    let store = Store::load_from_memory_async(format, data, true, &mut validation_log)
        .await
        .map_err(Error::from)?;
    let active_manifest = store.provenance_label().to_owned();

    Ok(DetailedInfo {
        claims: store
            .claims()
            .iter()
            .map(|claim| ClaimInfo {
                claim: claim.clone(),
                size: claim.data().map(|x| x.len()).unwrap_or(0),
                signature_info: claim.signature_info(),
                signature_size: claim.signature_val().len(),
                uri: claim.uri(),
            })
            .collect(),
        active_manifest,
    })
}
